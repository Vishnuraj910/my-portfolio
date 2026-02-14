"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

// Custom hook for device orientation (gyroscope)
function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({ gamma: 0, beta: 0 });
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if DeviceOrientationEvent is supported
    const deviceOrientationSupported = typeof DeviceOrientationEvent !== "undefined";
    setIsSupported(deviceOrientationSupported);

    // Check if we need to request permission (iOS 13+)
    if (deviceOrientationSupported && typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === "function") {
      // iOS requires permission - will be requested on user interaction
      setHasPermission(false);
    } else if (deviceOrientationSupported) {
      // Non-iOS or older iOS - try to use directly
      setHasPermission(true);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    // iOS 13+ requires permission
    const DeviceOrientationEventTyped = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof DeviceOrientationEventTyped.requestPermission === "function") {
      try {
        const permission = await DeviceOrientationEventTyped.requestPermission();
        const granted = permission === "granted";
        setHasPermission(granted);
        return granted;
      } catch {
        setHasPermission(false);
        return false;
      }
    }
    return true;
  }, [isSupported]);

  useEffect(() => {
    if (!isSupported || hasPermission === false) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Gamma: left/right tilt (-90 to 90)
      // Beta: front/back tilt (-180 to 180)
      const gamma = event.gamma ?? 0;
      const beta = event.beta ?? 0;
      setOrientation({ gamma, beta });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isSupported, hasPermission]);

  return { orientation, hasPermission, isSupported, requestPermission };
}

// Custom hook for touch position (mobile fallback)
function useTouchPosition() {
  const touchX = useMotionValue(0);
  const touchY = useMotionValue(0);
  const [hasTouch, setHasTouch] = useState(false);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchX.set(e.touches[0].clientX);
        touchY.set(e.touches[0].clientY);
        setHasTouch(true);
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => window.removeEventListener("touchmove", handleTouchMove);
  }, [touchX, touchY]);

  return { touchX, touchY, hasTouch };
}

export default function NeonGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);

  // Device orientation hook (gyroscope)
  const { orientation, hasPermission, isSupported: gyroSupported, requestPermission } = useDeviceOrientation();
  const { touchX, touchY, hasTouch } = useTouchPosition();

  // Detect if device is mobile/touch
  const [isMobile, setIsMobile] = useState(false);
  const heroLeftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(typeof window !== "undefined" && (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    ));
  }, []);

  // Request gyroscope permission on first touch (iOS requirement)
  useEffect(() => {
    if (!isMobile || !gyroSupported || hasPermission !== false) return;

    const handleFirstInteraction = async () => {
      await requestPermission();
    };

    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("click", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, [isMobile, gyroSupported, hasPermission, requestPermission]);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Determine which input source to use
  const useGyro = gyroSupported && hasPermission === true;
  const useTouch = isMobile && hasTouch && !useGyro;

  // Create motion values for the final input position
  const inputX = useMotionValue(0);
  const inputY = useMotionValue(0);

  // Update input values based on selected source
  useEffect(() => {
    if (useGyro) {
      // Map gyroscope to viewport coordinates
      const x = (orientation.gamma + 45) / 90 * window.innerWidth;
      const y = (orientation.beta + 90) / 180 * window.innerHeight;
      inputX.set(x);
      inputY.set(y);
    }
    // For mouse and touch, the values are already set via event listeners
  }, [useGyro, orientation, inputX, inputY]);

  // Calculate hero-left position and set initial glow position
  useEffect(() => {
    const calculateInitialPosition = () => {
      if (!heroLeftRef.current) return;

      const heroRect = heroLeftRef.current.getBoundingClientRect();
      const centerX = heroRect.left + heroRect.width / 2;
      const centerY = heroRect.top + heroRect.height / 2;

      // Set initial position to center of hero-left
      inputX.set(centerX);
      inputY.set(centerY);
    };

    calculateInitialPosition();

    // Recalculate on resize only if heroLeftRef.current exists
    if (heroLeftRef.current) {
      const resizeObserver = new ResizeObserver(calculateInitialPosition);
      resizeObserver.observe(heroLeftRef.current);

      return () => resizeObserver.disconnect();
    }

    return () => {};
  }, [inputX, inputY]);

// If not using gyro, copy from mouse/touch
  useEffect(() => {
    if (!useGyro) {
      const sourceX = useTouch ? touchX : mouseX;
      const sourceY = useTouch ? touchY : mouseY;

      const unsubscribeX = sourceX.on("change", (v) => inputX.set(v));
      const unsubscribeY = sourceY.on("change", (v) => inputY.set(v));

      return () => {
        unsubscribeX();
        unsubscribeY();
      };
    }
  }, [useGyro, useTouch, mouseX, mouseY, touchX, touchY, inputX, inputY]);

  // Mouse repulsion logic
  useEffect(() => {
    if (isMobile || useGyro) return;

    const handleRepulsion = () => {
      const mouseXVal = mouseX.get();
      const mouseYVal = mouseY.get();

      // Calculate distance from mouse to glow center
      const glowX = inputX.get();
      const glowY = inputY.get();

      const distanceX = mouseXVal - glowX;
      const distanceY = mouseYVal - glowY;

      const repulsionThreshold = 200; // Pixels
      const maxRepulsion = 100; // Maximum repulsion distance

      if (Math.abs(distanceX) < repulsionThreshold) {
        // Calculate repulsion force (stronger when closer)
        const force = (repulsionThreshold - Math.abs(distanceX)) / repulsionThreshold;
        const repulsionX = (force * maxRepulsion) * Math.sign(distanceX);

        // Apply repulsion to input position
        inputX.set(glowX - repulsionX);
      }
    };

    const interval = setInterval(handleRepulsion, 16); // ~60fps
    return () => clearInterval(interval);
  }, [isMobile, useGyro, mouseX, mouseY, inputX, inputY]);

  // Spring physics with gravity effect - lower stiffness = more weight/drag
  // Each layer follows with different delay for natural gravitational feel
  const springConfigMain = { stiffness: 25, damping: 25 };
  const springConfigSecondary = { stiffness: 15, damping: 30 };
  const springConfigTertiary = { stiffness: 10, damping: 35 };

  // Main glow follows cursor with offset to right
  const rawX = useSpring(inputX, springConfigMain);
  const rawY = useSpring(inputY, springConfigMain);
  const x = useTransform(rawX, (val) => val + 100);
  const y = rawY;

  // Secondary layer follows with more delay (gravity effect)
  const rawX2 = useSpring(inputX, springConfigSecondary);
  const rawY2 = useSpring(inputY, springConfigSecondary);
  const x2 = useTransform(rawX2, (val) => val + 80);
  const y2 = rawY2;

  // Tertiary layer has most delay (heaviest feel)
  const rawX3 = useSpring(inputX, springConfigTertiary);
  const rawY3 = useSpring(inputY, springConfigTertiary);
  const x3 = useTransform(rawX3, (val) => val + 120);
  const y3 = rawY3;

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Main animated glow - follows mouse/touch/gyroscope position */}
      <motion.div
        className="neon-glow"
        style={{
          x,
          y,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: -1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Add reference to hero-left for position calculation */}
        <div ref={heroLeftRef} style={{ display: "none" }} />
        {/* Animated gradient blob - main glow layer */}
        <motion.div
          className="glow-blob"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            filter: "blur(80px)",
            background: "linear-gradient(135deg, var(--gradient-1), var(--gradient-2), var(--gradient-3))",
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            background: [
              "linear-gradient(135deg, var(--gradient-1), var(--gradient-2), var(--gradient-3))",
              "linear-gradient(135deg, var(--gradient-2), var(--gradient-3), var(--gradient-1))",
              "linear-gradient(135deg, var(--gradient-3), var(--gradient-1), var(--gradient-2))",
              "linear-gradient(135deg, var(--gradient-1), var(--gradient-2), var(--gradient-3))",
            ],
            scale: [1, 1.1, 1.05, 1],
          }}
          transition={{
            background: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Secondary glow layer - follows with gravity delay */}
        <motion.div
          className="glow-secondary"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            filter: "blur(100px)",
            background: "var(--gradient-2)",
            opacity: 0.5,
            x: x2,
            y: y2,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.3, 0.2],
            scale: [1, 1.2, 1.1, 1],
          }}
          transition={{
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Third glow layer - follows with most gravity delay */}
        <motion.div
          className="glow-tertiary"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            filter: "blur(60px)",
            background: "var(--gradient-3)",
            opacity: 0.28,
            x: x3,
            y: y3,
          }}
          animate={{
            opacity: [0.28, 0.14, 0.35, 0.28],
            x: [0, 30, -20, 0],
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </motion.div>

      {/* Ambient background glow that extends below */}
      <div
        className="neon-glow-ambient"
        style={{
          position: "fixed",
          top: "20%",
          right: "-5%",
          width: "50vw",
          height: "80vh",
          pointerEvents: "none",
          zIndex: -1,
          background: "radial-gradient(ellipse at center, var(--gradient-1) 0%, transparent 70%)",
          opacity: 0.15,
        }}
      />
    </>
  );
}

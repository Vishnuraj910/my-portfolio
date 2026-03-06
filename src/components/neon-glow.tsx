"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({ gamma: 0, beta: 0 });
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isSupported] = useState(() => {
    if (typeof window === "undefined") return false;
    return typeof DeviceOrientationEvent !== "undefined";
  });

  useEffect(() => {
    if (!isSupported) return;

    const DeviceOrientationEventTyped = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof DeviceOrientationEventTyped.requestPermission === "function") {
      setHasPermission(false);
    } else {
      setHasPermission(true);
    }
  }, [isSupported]);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

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
      setOrientation({
        gamma: event.gamma ?? 0,
        beta: event.beta ?? 0,
      });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isSupported, hasPermission]);

  return { orientation, hasPermission, isSupported, requestPermission };
}

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
  const inputX = useMotionValue(0);
  const inputY = useMotionValue(0);

  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const viewportRef = useRef({ centerX: 0, centerY: 0 });

  const { orientation, hasPermission, isSupported: gyroSupported, requestPermission } = useDeviceOrientation();
  const { touchX, touchY, hasTouch } = useTouchPosition();

  const useGyro = gyroSupported && hasPermission === true;
  const useTouch = isMobile && hasTouch && !useGyro;

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0));

    const updateViewportCenter = () => {
      viewportRef.current = {
        centerX: window.innerWidth / 2,
        centerY: window.innerHeight / 2,
      };

      if (!useTouch && !useGyro) {
        inputX.set(viewportRef.current.centerX);
        inputY.set(viewportRef.current.centerY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    updateViewportCenter();
    window.addEventListener("resize", updateViewportCenter);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateViewportCenter);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, inputX, inputY, useTouch, useGyro]);

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
    const { centerX, centerY } = viewportRef.current;
    if (!centerX && !centerY) return;

    const maxShiftX = 280;
    const maxShiftY = 220;

    if (useGyro) {
      const normalizedGamma = clamp(orientation.gamma / 45, -1, 1);
      const normalizedBeta = clamp(orientation.beta / 45, -1, 1);
      inputX.set(centerX - normalizedGamma * maxShiftX);
      inputY.set(centerY - normalizedBeta * maxShiftY);
      return;
    }

    if (useTouch) {
      const unsubscribeTouchX = touchX.on("change", (value) => inputX.set(value));
      const unsubscribeTouchY = touchY.on("change", (value) => inputY.set(value));
      return () => {
        unsubscribeTouchX();
        unsubscribeTouchY();
      };
    }

    const unsubscribeMouseX = mouseX.on("change", (value) => {
      const normalizedX = clamp((value - centerX) / centerX, -1, 1);
      inputX.set(centerX - normalizedX * maxShiftX);
    });

    const unsubscribeMouseY = mouseY.on("change", (value) => {
      const normalizedY = clamp((value - centerY) / centerY, -1, 1);
      inputY.set(centerY - normalizedY * maxShiftY);
    });

    return () => {
      unsubscribeMouseX();
      unsubscribeMouseY();
    };
  }, [useGyro, useTouch, orientation, mouseX, mouseY, touchX, touchY, inputX, inputY]);

  const springConfigMain = { stiffness: 25, damping: 25 };
  const springConfigSecondary = { stiffness: 15, damping: 30 };
  const springConfigTertiary = { stiffness: 10, damping: 35 };

  const rawX = useSpring(inputX, springConfigMain);
  const rawY = useSpring(inputY, springConfigMain);
  const x = useTransform(rawX, (val) => val + 100);
  const y = rawY;

  const rawX2 = useSpring(inputX, springConfigSecondary);
  const rawY2 = useSpring(inputY, springConfigSecondary);
  const x2 = useTransform(rawX2, (val) => val + 80);
  const y2 = rawY2;

  const rawX3 = useSpring(inputX, springConfigTertiary);
  const rawY3 = useSpring(inputY, springConfigTertiary);
  const x3 = useTransform(rawX3, (val) => val + 120);
  const y3 = rawY3;

  if (!isMounted) return null;

  return (
    <>
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

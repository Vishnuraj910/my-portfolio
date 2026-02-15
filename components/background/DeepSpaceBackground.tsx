"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

/**
 * DeepSpaceBackground - A Canvas-based space depth and shooting stars background
 *
 * Features:
 * - Depth starfield with 3 parallax layers
 * - Shooting stars with gravity-like motion, gradient tails, and subtle waving
 * - Theme-aware colors (dark/light)
 * - Reduced motion support
 * - Performance optimized with requestAnimationFrame
 */

// Configuration
const CONFIG = {
  // Depth starfield settings
  starfield: {
    layerCount: 3,
    starsPerLayer: [40, 25, 15], // Stars per layer (back to front)
    sizes: [0.5, 1, 1.5], // Base sizes in pixels
    baseAlpha: [0.3, 0.5, 0.7], // Base opacity per layer
    parallaxStrength: [0.02, 0.04, 0.06], // Movement strength per layer
  },

  // Shooting stars settings
  shootingStars: {
    maxCount: 8,
    minSpawnInterval: 2000, // ms
    maxSpawnInterval: 6000, // ms
    minSpeed: 3,
    maxSpeed: 8,
    minTailLength: 60,
    maxTailLength: 150,
    minSize: 1.5,
    maxSize: 3,
    gravity: 0.08, // Vertical acceleration
    wobbleFreq: 0.15, // Wobble frequency
    wobbleAmp: 1.5, // Wobble amplitude in pixels
  },

  // Theme colors (will be overridden by CSS variables)
  colors: {
    dark: {
      background: "#050812",
      starColor: "#e2e8f0",
      starMuted: "#64748b",
      shootingStarHead: "#ffffff",
      shootingStarTail: "#a5b4fc",
    },
    light: {
      background: "#f4f6fb",
      starColor: "#64748b",
      starMuted: "#94a3b8",
      shootingStarHead: "#6366f1",
      shootingStarTail: "#818cf8",
    },
  },
};

// Types
interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  layer: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  tailLength: number;
  life: number;
  maxLife: number;
  color: string;
  tailColor: string;
  wobblePhase: number;
  active: boolean;
}

interface ThemeColors {
  background: string;
  starColor: string;
  starMuted: string;
  shootingStarHead: string;
  shootingStarTail: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _getThemeColors(): ThemeColors {
  if (typeof window === "undefined") return CONFIG.colors.dark;

  const isDark = document.documentElement.getAttribute("data-theme") === "dark" ||
    (!document.documentElement.getAttribute("data-theme") &&
     window.matchMedia("(prefers-color-scheme: dark)").matches);

  return isDark ? CONFIG.colors.dark : CONFIG.colors.light;
}

function getComputedStyleColor(variable: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const computed = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return computed || fallback;
}

export default function DeepSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const nextSpawnRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const colorsRef = useRef<ThemeColors>(CONFIG.colors.dark);
  const reducedMotion = useReducedMotion();

  // Initialize stars for a layer
  const createStarsForLayer = useCallback((layer: number, width: number, height: number): Star[] => {
    const count = CONFIG.starfield.starsPerLayer[layer];
    const stars: Star[] = [];

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: CONFIG.starfield.sizes[layer] * (0.8 + Math.random() * 0.4),
        alpha: CONFIG.starfield.baseAlpha[layer] * (0.5 + Math.random() * 0.5),
        layer,
      });
    }

    return stars;
  }, []);

  // Initialize all stars
  const initializeStars = useCallback((width: number, height: number) => {
    starsRef.current = [];
    for (let layer = 0; layer < CONFIG.starfield.layerCount; layer++) {
      starsRef.current.push(...createStarsForLayer(layer, width, height));
    }
  }, [createStarsForLayer]);

  // Create a new shooting star
  const createShootingStar = useCallback((width: number, height: number): ShootingStar => {
    const speed = CONFIG.shootingStars.minSpeed +
      Math.random() * (CONFIG.shootingStars.maxSpeed - CONFIG.shootingStars.minSpeed);

    // Spawn from random edge (0=top, 1=right, 2=bottom, 3=left)
    const edge = Math.floor(Math.random() * 4);
    let x: number, y: number;
    let angle: number;

    switch (edge) {
      case 0: // Top - moving down-right
        x = Math.random() * width;
        y = -20;
        angle = Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 3;
        break;
      case 1: // Right - moving left-down
        x = width + 20;
        y = Math.random() * height * 0.5;
        angle = Math.PI * 3/4 + (Math.random() - 0.5) * Math.PI / 3;
        break;
      case 2: // Bottom - moving up-right
        x = Math.random() * width;
        y = height + 20;
        angle = -Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 3;
        break;
      case 3: // Left - moving right-down
      default:
        x = -20;
        y = Math.random() * height * 0.5;
        angle = -Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 3;
        break;
    }

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: CONFIG.shootingStars.minSize +
        Math.random() * (CONFIG.shootingStars.maxSize - CONFIG.shootingStars.minSize),
      tailLength: CONFIG.shootingStars.minTailLength +
        Math.random() * (CONFIG.shootingStars.maxTailLength - CONFIG.shootingStars.minTailLength),
      life: 0,
      maxLife: Math.max(width, height) / speed + 50,
      color: colorsRef.current.shootingStarHead,
      tailColor: colorsRef.current.shootingStarTail,
      wobblePhase: Math.random() * Math.PI * 2,
      active: true,
    };
  }, []);

  // Draw a single star
  const drawStar = useCallback((ctx: CanvasRenderingContext2D, star: Star, offsetX: number, offsetY: number, width: number, height: number) => {
    const { x, y, size, alpha, layer } = star;
    const parallax = CONFIG.starfield.parallaxStrength[layer];

    const drawX = x + offsetX * parallax;
    const drawY = y + offsetY * parallax;

    // Wrap around screen
    const wrappedX = ((drawX % width) + width) % width;
    const wrappedY = ((drawY % height) + height) % height;

    ctx.beginPath();
    ctx.arc(wrappedX, wrappedY, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  }, []);

  // Draw shooting star with gradient tail and wobble
  const drawShootingStar = useCallback((ctx: CanvasRenderingContext2D, star: ShootingStar, time: number) => {
    if (!star.active) return;

    const { x, y, vx, vy, size, tailLength, color, wobblePhase } = star;
    // tailColor is intentionally unused - using white for tail segments

    // Calculate velocity magnitude and direction
    const speed = Math.sqrt(vx * vx + vy * vy);
    const dirX = vx / speed;
    const dirY = vy / speed;

    // Perpendicular direction for wobble
    const perpX = -dirY;
    const perpY = dirX;

    // Draw tail with gradient and wobble
    const segments = 20;
    const segmentLength = tailLength / segments;

    for (let i = segments - 1; i >= 0; i--) {
      const t = i / segments; // 0 at tail end, 1 at head
      const progress = 1 - t; // 1 at head, 0 at tail

      // Position along tail
      const baseX = x - dirX * segmentLength * i;
      const baseY = y - dirY * segmentLength * i;

      // Add wobble (only visible closer to head for more natural look)
      const wobbleAmount = Math.sin(time * CONFIG.shootingStars.wobbleFreq + wobblePhase + i * 0.3)
        * CONFIG.shootingStars.wobbleAmp * progress;
      const wobbleX = perpX * wobbleAmount;
      const wobbleY = perpY * wobbleAmount;

      const drawX = baseX + wobbleX;
      const drawY = baseY + wobbleY;

      // Opacity gradient: 0.6 near head → 0 at tail
      const alpha = progress * 0.6;

      ctx.beginPath();
      ctx.arc(drawX, drawY, size * progress * 0.8 + 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.fill();
    }

    // Draw head (bright point)
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 3;
    ctx.fill();
    ctx.shadowBlur = 0;
  }, []);

  // Main render loop
  const render = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Calculate mouse offset for parallax (centered at 0)
    const offsetX = (mouseRef.current.x - width / 2) / width;
    const offsetY = (mouseRef.current.y - height / 2) / height;

    // Clear canvas with theme-aware background
    ctx.fillStyle = colorsRef.current.background;
    ctx.fillRect(0, 0, width, height);

    // Draw depth starfield
    for (const star of starsRef.current) {
      drawStar(ctx, star, offsetX * 100, offsetY * 100, width, height);
    }

    // Spawn new shooting stars
    const now = performance.now();
    if (now > nextSpawnRef.current && shootingStarsRef.current.length < CONFIG.shootingStars.maxCount) {
      // In reduced motion, spawn less frequently
      const spawnMultiplier = reducedMotion ? 3 : 1;
      if (Math.random() < 0.3 / spawnMultiplier) {
        shootingStarsRef.current.push(createShootingStar(width, height));
        lastSpawnRef.current = now;
        nextSpawnRef.current = now +
          (CONFIG.shootingStars.minSpawnInterval +
           Math.random() * (CONFIG.shootingStars.maxSpawnInterval - CONFIG.shootingStars.minSpawnInterval)) * spawnMultiplier;
      }
    }

    // Update and draw shooting stars
    const gravity = reducedMotion ? 0 : CONFIG.shootingStars.gravity;

    shootingStarsRef.current = shootingStarsRef.current.filter(star => {
      if (!star.active) return false;

      // Update position with gravity
      star.vy += gravity;
      star.x += star.vx;
      star.y += star.vy;
      star.life++;

      // Check if out of bounds (all four sides) or expired
      const margin = 50;
      if (
        star.x < -margin ||
        star.x > width + margin ||
        star.y < -margin ||
        star.y > height + margin ||
        star.life > star.maxLife
      ) {
        return false;
      }

      drawShootingStar(ctx, star, time / 1000);
      return true;
    });

    animationFrameRef.current = requestAnimationFrame(render);
  }, [createShootingStar, drawStar, drawShootingStar, reducedMotion]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();

    // Use logical dimensions (no DPR scaling) to match coordinate system with stars
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Reinitialize stars for new dimensions
    initializeStars(rect.width, rect.height);
  }, [initializeStars]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Update colors based on theme
  const updateColors = useCallback(() => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") &&
       window.matchMedia("(prefers-color-scheme: dark)").matches);

    const themeColors = isDark ? CONFIG.colors.dark : CONFIG.colors.light;

    // Try to get colors from CSS variables
    colorsRef.current = {
      background: getComputedStyleColor("--bg", themeColors.background),
      starColor: isDark ? "#e2e8f0" : "#64748b",
      starMuted: isDark ? "#64748b" : "#94a3b8",
      shootingStarHead: isDark ? "#ffffff" : "#6366f1",
      shootingStarTail: isDark ? "#a5b4fc" : "#818cf8",
    };
  }, []);

  // Initialize and cleanup
  useEffect(() => {
    handleResize();
    updateColors();

    // Initial spawn time
    nextSpawnRef.current = performance.now() + 2000;

    // Start render loop
    animationFrameRef.current = requestAnimationFrame(render);

    // Event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Theme change listener
    const themeObserver = new MutationObserver(updateColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    // Color scheme change listener
    const colorSchemeListener = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeListener.addEventListener("change", updateColors);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      themeObserver.disconnect();
      colorSchemeListener.removeEventListener("change", updateColors);
    };
  }, [handleResize, handleMouseMove, render, updateColors]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="deep-space-background"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

import { useEffect, useRef } from "react";

// Classic 8x8 Bayer ordered dithering matrix normalized to [0, 1)
const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].map((row) => row.map((v) => (v + 0.5) / 64));

/**
 * Legency Media's signature Bayer-dithered electric-blue (#001AFF) ringed planet graphic.
 * Renders a 3D sphere + tilted planetary ring quantized in real time onto a crisp square pixel grid.
 */
export function InteractiveGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let phase = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 480);
      height = Math.max(rect.height, 480);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      pointerY = ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const renderFrame = () => {
      animId = requestAnimationFrame(renderFrame);
      phase += 0.012;
      smoothX += (pointerX - smoothX) * 0.05;
      smoothY += (pointerY - smoothY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Pixel grid step size matching Legency's crisp square dither matrix
      const step = 6;
      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      // Sphere center placed in upper-right (slightly clipped at top, matching screenshot)
      const cx = width * 0.62 + smoothX * 10;
      const cy = height * 0.39 + smoothY * 8;
      const radius = Math.min(width, height) * 0.45;

      // Ring tilt angle (-19.5 degrees from bottom-left to top-right)
      const ringAngle = -0.34 + smoothX * 0.025;
      const cosA = Math.cos(ringAngle);
      const sinA = Math.sin(ringAngle);
      // Ring center slightly offset to sweep lower across the planet
      const rcx = cx - radius * 0.04;
      const rcy = cy + radius * 0.22;

      for (let gy = 0; gy < rows; gy++) {
        const y = gy * step + step * 0.5;
        const bayerRow = BAYER_8X8[gy & 7]!;

        for (let gx = 0; gx < cols; gx++) {
          const x = gx * step + step * 0.5;
          const threshold = bayerRow[gx & 7]!;

          // 1. Sphere coordinates normalized to radius
          const dx = (x - cx) / radius;
          const dy = (y - cy) / radius;
          const r2 = dx * dx + dy * dy;
          const insideSphere = r2 <= 1.0;

          // 2. Tilted Planetary Ring coordinates
          const rx = ((x - rcx) * cosA - (y - rcy) * sinA) / radius;
          const ry = ((x - rcx) * sinA + (y - rcy) * cosA) / radius;
          // Foreshortened ellipse for the ring (aspect ~ 0.22)
          const ringAspect = 0.21;
          const ringDist = Math.sqrt(rx * rx + (ry / ringAspect) * (ry / ringAspect));

          // Front half of the ring (ry > -0.02) vs back half occluded by sphere
          const isBackRing = ry < 0 && insideSphere;

          let ringIntensity = 0;
          if (!isBackRing && ringDist > 0.92 && ringDist < 2.15) {
            // Primary dense inner band
            const band1 = Math.exp(-Math.pow((ringDist - 1.24) / 0.13, 2)) * 0.92;
            // Secondary outer dithered band
            const band2 = Math.exp(-Math.pow((ringDist - 1.56) / 0.24, 2)) * 0.48;
            // Subtle orbital shimmer along the ring
            const ringWave =
              0.88 + 0.12 * Math.sin(rx * 5.0 - phase * 1.4 + ry * 8.0);
            // Fade smoothly at extreme left/right tips
            const tipFade = Math.max(0, 1 - Math.pow(Math.abs(rx) / 2.08, 3));
            ringIntensity = (band1 + band2) * ringWave * tipFade;
          }

          let sphereIntensity = 0;
          let onLitSphere = false;

          if (insideSphere) {
            const dz = Math.sqrt(Math.max(0, 1.0 - r2));
            onLitSphere = true;

            // Strong crescent shadow on the LEFT side of the sphere (dx < 0)
            // matching Legency's left-heavy electric blue dithered crescent
            const crescent = Math.pow(Math.max(0, -dx * 0.78 + 0.28 - dy * 0.08), 1.45) * 1.28;

            // Rim accent along the left edge
            const leftRim =
              dx < 0 ? Math.pow(1.0 - dz, 1.7) * Math.max(0, -dx) * 0.95 : 0;

            // Rotating planetary surface texture bands
            const lon = Math.atan2(dx, dz) + phase * 0.35;
            const lat = Math.asin(Math.max(-1, Math.min(1, dy)));
            const surfaceTex =
              Math.sin(lon * 3.0 + Math.sin(lat * 4.0)) *
              Math.cos(lat * 3.5) *
              0.14;

            sphereIntensity = Math.max(
              0.08,
              Math.min(1.0, crescent + leftRim + surfaceTex * Math.max(0.2, -dx + 0.4)),
            );
          }

          // Combine sphere and front ring intensity
          const total = Math.max(sphereIntensity, ringIntensity);

          // Determine pixel color & square size via ordered Bayer dithering
          if (total > 0.68 && total - threshold * 0.52 > 0.42) {
            // Level 4: Deep / Vivid Electric Blue (#001AFF) full pixel square
            ctx.fillStyle =
              total > 0.88 && (gx + gy) % 3 === 0 ? "#0011b8" : "#001aff";
            ctx.fillRect(gx * step, gy * step, step - 1, step - 1);
          } else if (total > 0.36 && total - threshold * 0.58 > 0.16) {
            // Level 3: Medium Cobalt Blue pixel square
            ctx.fillStyle = total > 0.52 ? "#1a33ff" : "#475dff";
            ctx.fillRect(gx * step + 0.5, gy * step + 0.5, step - 1.5, step - 1.5);
          } else if (total > 0.16 && total > threshold * 0.72) {
            // Level 2: Soft Periwinkle dither square
            ctx.fillStyle = "#8a99ff";
            ctx.fillRect(gx * step + 1, gy * step + 1, step - 2.5, step - 2.5);
          } else if (
            onLitSphere ||
            (!isBackRing && ringDist > 0.88 && ringDist < 2.05 && (gx + gy) % 2 === 0)
          ) {
            // Level 1: Regular halftone background dot grid on the sunlit right face & ring halo
            ctx.fillStyle = onLitSphere ? "#bcc5f7" : "#cfd5fa";
            ctx.fillRect(gx * step + 1.5, gy * step + 1.5, 2.5, 2.5);
          }
        }
      }
    };

    renderFrame();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}

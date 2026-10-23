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
 * Full-bleed right-side hero canvas with a bottom-left to top-right (/) planetary ring.
 * Adapts cleanly between Light Mode (default) and flat matte Dark Mode.
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
      width = Math.max(rect.width, 280);
      height = Math.max(rect.height, 360);
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
      phase += 0.008;
      smoothX += (pointerX - smoothX) * 0.04;
      smoothY += (pointerY - smoothY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const isMobile = width < 640;

      // Crisp square pixel grid matching image-2.png
      const step = isMobile ? 5 : 6;
      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      // Sphere centered on the right so top & bottom bleed naturally off the hero edges
      const radius = isMobile
        ? Math.min(width, height) * 0.48
        : height * 0.55;
      const cx = (isMobile ? width * 0.82 : width * 0.67) + smoothX * 8;
      const cy = (isMobile ? height * 0.32 : height * 0.45) + smoothY * 6;

      // Positive angle (+0.37 rad = +21 deg) sweeps ring from BOTTOM-LEFT (/) to TOP-RIGHT
      const ringAngle = 0.37 + smoothX * 0.02;
      const cosA = Math.cos(ringAngle);
      const sinA = Math.sin(ringAngle);

      // Ring center slightly below sphere center, matching image-2.png
      const rcx = cx - radius * 0.06;
      const rcy = cy + radius * 0.14;

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

          // 2. Tilted Planetary Ring coordinates (sweeping bottom-left `/` to top-right)
          const dxRing = x - rcx;
          const dyRing = y - rcy;
          const rx = (dxRing * cosA - dyRing * sinA) / radius;
          const ry = (dxRing * sinA + dyRing * cosA) / radius;

          // Foreshortened ellipse for the Saturn-like ring
          const ringAspect = 0.22;
          const ringDist = Math.sqrt(
            rx * rx + (ry / ringAspect) * (ry / ringAspect),
          );

          // Back half of ring (ry < 0) is occluded behind the sphere
          const isBackRing = ry < 0 && insideSphere;

          let ringIntensity = 0;
          let inRingGap = false;

          if (!isBackRing && ringDist > 0.88 && ringDist < 1.92) {
            if (insideSphere && ry > 0 && ringDist > 0.96 && ringDist < 1.14) {
              inRingGap = true;
            }

            const mainBand =
              Math.exp(-Math.pow((ringDist - 1.32) / 0.12, 2)) * 0.95;
            const outerBand =
              Math.exp(-Math.pow((ringDist - 1.56) / 0.22, 2)) * 0.45;
            const shimmer =
              0.9 + 0.1 * Math.sin(rx * 4.5 - phase * 1.2 + ry * 6.0);
            const tipFade = Math.max(0, 1 - Math.pow(Math.abs(rx) / 1.88, 3.2));

            ringIntensity = (mainBand + outerBand) * shimmer * tipFade;
          }

          let sphereIntensity = 0;

          if (insideSphere) {
            const dz = Math.sqrt(Math.max(0, 1.0 - r2));

            const leftCrescent =
              Math.pow(Math.max(0, -dx * 0.82 + 0.22 - dy * 0.06), 1.5) * 1.35;

            const leftRim =
              dx < -0.15
                ? Math.pow(1.0 - dz, 1.55) * Math.max(0, -dx) * 1.05
                : 0;

            const lon = Math.atan2(dx, dz) + phase * 0.3;
            const lat = Math.asin(Math.max(-1, Math.min(1, dy)));
            const patch =
              Math.sin(lon * 2.8 + Math.cos(lat * 3.2)) *
              Math.cos(lat * 3.0) *
              0.12;

            sphereIntensity = Math.max(
              0.08,
              Math.min(
                1.0,
                leftCrescent +
                  leftRim +
                  patch * Math.max(0.15, -dx + 0.35),
              ),
            );

            if (inRingGap) {
              sphereIntensity *= 0.28;
            }
          }

          const total = Math.max(sphereIntensity, ringIntensity);

          // Ordered Bayer dithering into crisp axis-aligned square pixels
          if (total > 0.66 && total - threshold * 0.52 > 0.4) {
            ctx.fillStyle = isDark ? "#2845ff" : "#001aff";
            ctx.fillRect(gx * step, gy * step, step - 1.2, step - 1.2);
          } else if (total > 0.35 && total - threshold * 0.56 > 0.15) {
            ctx.fillStyle = isDark
              ? total > 0.5
                ? "#3b56ff"
                : "#4f68ff"
              : total > 0.5
                ? "#1f38ff"
                : "#4f66ff";
            ctx.fillRect(
              gx * step + 0.5,
              gy * step + 0.5,
              step - 1.8,
              step - 1.8,
            );
          } else if (total > 0.16 && total > threshold * 0.72) {
            ctx.fillStyle = isDark ? "#33427a" : "#8f9eff";
            ctx.fillRect(gx * step + 1, gy * step + 1, step - 2.6, step - 2.6);
          } else if (
            insideSphere ||
            (!isBackRing &&
              ringDist > 0.9 &&
              ringDist < 1.85 &&
              (gx + gy) % 2 === 0) ||
            (x > width * 0.42 && gx % 2 === 0 && gy % 2 === 0)
          ) {
            ctx.fillStyle = isDark
              ? insideSphere
                ? "#222940"
                : "#191d2b"
              : insideSphere
                ? "#bfc7f7"
                : "#d8dcf5";
            ctx.fillRect(gx * step + 1.5, gy * step + 1.5, 2, 2);
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

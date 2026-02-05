import { useEffect, useMemo, useRef } from "react";
import useWindowSize from "@/hooks/useWindowSize";

export default function FlowingFs() {
  const COUNT = 16;

  const SCALE_LIMIT = 60; // px
  const SIZE_LIMIT = 500; // px

  const MAX_VW = 10; // biggest at center
  const MIN_VW = 6; // smallest at edges

  // ===== MOBILE ANIMATION SETTINGS =====
  const MOBILE_ANIMATION_SPEED = 2; // seconds for one full cycle (lower = faster)
  const MOBILE_ANIMATION_EASE = 1; // 0 = linear, 0.5 = ease-in-out, 1 = more dramatic easing
  // =====================================

  const itemRefs = useRef([]);
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: 0, hasMoved: false });
  const startTimeRef = useRef(Date.now());

  const { isMobile } = useWindowSize();

  const items = useMemo(() => Array.from({ length: COUNT }, (_, i) => i), []);

  useEffect(() => {
    const onPointerMove = (e) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.hasMoved = true;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const update = () => {
      if (isMobile) {
        // ===== MOBILE: Animated oscillation =====
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const cycle = (elapsed / MOBILE_ANIMATION_SPEED) % 1;

        // Apply easing
        const eased = easeInOutCustom(cycle, MOBILE_ANIMATION_EASE);

        // Oscillate between -1 and 1
        const oscillation = Math.sin(eased * Math.PI * 2);

        for (let i = 0; i < COUNT; i++) {
          const el = itemRefs.current[i];
          if (!el) continue;

          // Create a wave effect across items
          const offset = i / COUNT;
          const itemOscillation = Math.sin((eased + offset) * Math.PI * 2);

          el.style.setProperty("--sx", itemOscillation);

          // Optional: also animate font size
          const sizeT = Math.abs(itemOscillation);
          const fontSizeVw = lerp(MAX_VW, MIN_VW, sizeT);
          el.style.setProperty("--fs", `${fontSizeVw}vw`);
        }
      } else {
        // ===== DESKTOP: Mouse tracking =====
        if (!pointerRef.current.hasMoved) {
          rafRef.current = requestAnimationFrame(update);

          return;
        }

        const px = pointerRef.current.x;

        for (let i = 0; i < COUNT; i++) {
          const el = itemRefs.current[i];
          if (!el) continue;

          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const dx = px - cx;

          // ---- scaleX (±200px) ----
          const scaleDx = clamp(dx, -SCALE_LIMIT, SCALE_LIMIT);
          const scaleX = scaleDx / SCALE_LIMIT;

          // ---- font size (±400px) ----
          const sizeEdge = clamp01(Math.abs(dx) / SIZE_LIMIT);
          const fontSizeVw = lerp(MAX_VW, MIN_VW, sizeEdge);

          el.style.setProperty("--sx", -scaleX);
          el.style.setProperty("--fs", `${fontSizeVw}vw`);
        }
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, COUNT);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        gap: "1vw",
      }}
    >
      {items.map((i) => (
        <div
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          style={{
            transform: "scaleX(var(--sx, 0))",
            // fontSize: "var(--fs, 6vw)",
            fontSize: "10vw",
            // color: (i - 1) % 4 == 0 ? "white" : "black",
          }}
        >
          F
        </div>
      ))}
    </div>
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOutCustom(t, strength) {
  // strength: 0 = linear, 0.5 = ease-in-out, 1 = more dramatic
  if (strength === 0) return t;
  const power = 2 + strength * 2;
  return t < 0.5
    ? Math.pow(2 * t, power) / 2
    : 1 - Math.pow(2 * (1 - t), power) / 2;
}

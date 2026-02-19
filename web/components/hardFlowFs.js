import { useEffect, useMemo, useRef } from "react";
import useWindowSize from "@/hooks/useWindowSize";

export default function HardFlowFs() {
  const COUNT = 20;

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

        const eased = easeInOutCustom(cycle, MOBILE_ANIMATION_EASE);

        for (let i = 0; i < COUNT; i++) {
          const el = itemRefs.current[i];
          if (!el) continue;

          const offset = i / COUNT;
          const itemOscillation = Math.sin((eased + offset) * Math.PI * 2);

          // Binary: flip if oscillation < 0
          el.style.setProperty("--sx", itemOscillation < 0 ? -1 : 1);
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

          // Binary: cursor to the left → flipped (-1), otherwise normal (1)
          el.style.setProperty("--sx", px < cx ? 1 : -1);
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
        width: "100vw",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        gap: "2vw",
        margin: "6rem calc(var(--padding) * -1)",
        marginTop: "6rem",
        marginBottom: "6rem",
      }}
    >
      {items.map((i) => (
        <div
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          style={{
            transform: "scaleX(var(--sx, 1))",
            fontSize: "7vw",
          }}
        >
          F
        </div>
      ))}
    </div>
  );
}

function easeInOutCustom(t, strength) {
  if (strength === 0) return t;
  const power = 2 + strength * 2;
  return t < 0.5
    ? Math.pow(2 * t, power) / 2
    : 1 - Math.pow(2 * (1 - t), power) / 2;
}

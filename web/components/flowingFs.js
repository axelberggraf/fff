import { useEffect, useMemo, useRef } from "react";

export default function FlowingFs() {
  const COUNT = 32;

  const SCALE_LIMIT = 200; // px
  const SIZE_LIMIT = 500; // px

  const MAX_VW = 10; // biggest at center
  const MIN_VW = 6; // smallest at edges

  const itemRefs = useRef([]);
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: 0, hasMoved: false });

  const items = useMemo(() => Array.from({ length: COUNT }, (_, i) => i), []);

  useEffect(() => {
    const onPointerMove = (e) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.hasMoved = true;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const update = () => {
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

        el.style.setProperty("--sx", scaleX);
        el.style.setProperty("--fs", `${fontSizeVw}vw`);
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
      }}
    >
      {items.map((i) => (
        <div
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          style={{
            transform: "scaleX(var(--sx, 0))",
            fontSize: "var(--fs, 6vw)",
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

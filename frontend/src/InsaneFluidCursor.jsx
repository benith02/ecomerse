import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function FluidCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // BIG circle follows cursor
  const bigX = useSpring(mouseX, { stiffness: 400, damping: 35 });
  const bigY = useSpring(mouseY, { stiffness: 400, damping: 35 });

  // SMALL circle follows BIG circle (slower)
  const smallX = useSpring(bigX, { stiffness: 200, damping: 25 });
  const smallY = useSpring(bigY, { stiffness: 200, damping: 25 });

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const smoothOffsetX = useSpring(offsetX, { stiffness: 300, damping: 20 });
  const smoothOffsetY = useSpring(offsetY, { stiffness: 300, damping: 20 });

  const last = useRef({ x: 0, y: 0 });
  const idleTimer = useRef(null);

  const BIG = 60;
  const SMALL = 20;

  const outsideBase = BIG / 2 + SMALL / 2;

  useEffect(() => {
    const move = (e) => {
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;

      const velocity = Math.sqrt(dx * dx + dy * dy);

      let dirX = 0;
      let dirY = 0;

      if (velocity !== 0) {
        dirX = dx / velocity;
        dirY = dy / velocity;
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (velocity > 0.5) {
        const stretch = Math.min(velocity * 0.4, 40);
        const distance = outsideBase + stretch;

        offsetX.set(dirX * distance);
        offsetY.set(dirY * distance);
      }

      last.current = { x: e.clientX, y: e.clientY };

      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        offsetX.set(0);
        offsetY.set(0);
      }, 120);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* BIG CIRCLE */}
      <motion.div
        style={{
          position: "fixed",
          width: BIG,
          height: BIG,
          borderRadius: "50%",
          background: "rgba(88, 143, 177, 0.5)",
          pointerEvents: "none",
          left: bigX,
          top: bigY,
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      />

      {/* SMALL CIRCLE (follows BIG circle, not cursor) */}
      <motion.div
        style={{
          position: "fixed",
          width: SMALL,
          height: SMALL,
          borderRadius: "50%",
          background: "rgba(15, 85, 129, 0.61)",
          pointerEvents: "none",
          left: smallX,  // 🔥 follows big circle
          top: smallY,   // 🔥 follows big circle
          transform: "translate(-50%, -50%)",
          x: smoothOffsetX,
          y: smoothOffsetY,
          zIndex: 10000,
        }}
      />
    </>
  );
}

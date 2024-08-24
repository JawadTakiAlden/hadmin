"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const AnimatedCounter = ({
  value,
  direction = "up",
}) => {
  const ref = useRef(null);
  const initialMotionValue = direction === "down" ? value : 0;
  const motionValue = useMotionValue(initialMotionValue);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          latest.toFixed(0)
        );
      }
    });

    // Ensure the value is displayed immediately, even if it's 0
    if (ref.current) {
      ref.current.textContent = Intl.NumberFormat("en-US").format(
        initialMotionValue.toFixed(0)
      );
    }
  }, [springValue, initialMotionValue]);

  return <span ref={ref} />;
};

export default AnimatedCounter;

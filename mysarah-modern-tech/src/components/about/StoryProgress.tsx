"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export default function StoryProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.22,
  });

  const progress = reduceMotion ? scrollYProgress : springProgress;
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="story-progress-track" aria-hidden="true">
      <motion.div className="story-progress-fill" style={{ scaleX, transformOrigin: "0% 50%" }} />
    </div>
  );
}

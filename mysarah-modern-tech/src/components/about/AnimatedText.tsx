"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}

export default function AnimatedText({ children, className = "", delay = 0, as = "div" }: AnimatedTextProps) {
  const reduceMotion = useReducedMotion();

  const animationProps = {
    className,
    initial: { opacity: 0, y: reduceMotion ? 0 : 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: reduceMotion ? 0.2 : 0.72, ease: [0.22, 1, 0.36, 1] as const, delay },
  };

  if (as === "li") {
    return <motion.li {...animationProps}>{children}</motion.li>;
  }

  return <motion.div {...animationProps}>{children}</motion.div>;
}

"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const SparklesText = ({
  words,
  className,
  onAnimationComplete,
}: {
  words: string;
  className?: string;
  onAnimationComplete?: () => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const letters = words.split("");

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {letters.map((letter, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.2,
            delay: idx * 0.1,
            ease: "easeOut",
          }}
          onAnimationComplete={() => {
            if (idx === letters.length - 1 && onAnimationComplete) {
              onAnimationComplete();
            }
          }}
          className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};
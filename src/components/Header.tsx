import { Beaker } from "lucide-react";
import { useState, useEffect } from "react";
import { SparklesText } from "./SparklesText";
import { GooeyText } from "./GooeyText";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showShortTitle, setShowShortTitle] = useState(false);

  useEffect(() => {
    if (showSubtitle) {
      const timer = setTimeout(() => {
        setShowShortTitle(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSubtitle]);

  return (
    <header className="mb-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <AnimatePresence>
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Beaker className="w-12 h-12 text-primary animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {!showShortTitle ? (
            <SparklesText
              key="full-title"
              words="Pulp Picker"
              onAnimationComplete={() => setShowSubtitle(true)}
            />
          ) : (
            <motion.div
              key="short-title"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                PP
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-24 flex items-center justify-center"
          >
            <GooeyText
              texts={["You WILL drink", "the AI slop", "You WILL drink the AI slop"]}
              morphTime={1.5}
              cooldownTime={1.5}
              className="text-xl text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
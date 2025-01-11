import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GooeyText } from "./GooeyText";

export const Header = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showShortTitle, setShowShortTitle] = useState(false);
  const [showGooeyText, setShowGooeyText] = useState(false);

  useEffect(() => {
    if (showSubtitle) {
      const timer = setTimeout(() => {
        setShowShortTitle(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSubtitle]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4 text-center py-8">
      <div className="relative h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!showShortTitle && (
            <motion.div
              key="fullTitle"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Pulp Picker
              </h1>
            </motion.div>
          )}
          {showShortTitle && (
            <motion.div
              key="shortTitle"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => setShowGooeyText(true)}
              onHoverEnd={() => setShowGooeyText(false)}
              onClick={() => setShowGooeyText(!showGooeyText)}
              className="cursor-pointer"
            >
              <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                PP
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showGooeyText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="h-24 flex items-center justify-center"
        >
          <GooeyText
            texts={["You", "WILL", "drink", "the", "AI", "slop"]}
            className="text-2xl md:text-4xl tracking-wider font-light max-w-3xl w-full"
          />
        </motion.div>
      )}
    </div>
  );
};
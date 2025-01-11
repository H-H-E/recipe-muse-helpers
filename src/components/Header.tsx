import { Beaker } from "lucide-react";
import { useState } from "react";
import { SparklesText } from "./SparklesText";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);

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
        <SparklesText
          words="Pulp Picker"
          onAnimationComplete={() => setShowSubtitle(true)}
        />
      </div>
      <AnimatePresence>
        {showSubtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed"
          >
            You WILL drink the AI slop
          </motion.p>
        )}
      </AnimatePresence>
    </header>
  );
};
import { Loader2 } from "lucide-react";

export const SmoothieLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-[200px]">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 animate-spin">
          <Loader2 className="w-24 h-24 text-purple-500" />
        </div>
        <div className="absolute inset-0 animate-pulse">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mx-auto mt-8" />
        </div>
      </div>
      <p className="text-lg font-medium text-purple-700 dark:text-purple-300 animate-pulse">
        Blending your smoothie recipes...
      </p>
    </div>
  );
};
import { Loader2 } from "lucide-react";

export const SmoothieLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-[200px]">
      <div className="relative w-32 h-32">
        {/* Blender Container */}
        <div className="absolute inset-0 animate-pulse">
          <div className="w-24 h-24 mx-auto bg-gradient-to-b from-purple-100 to-purple-300 dark:from-purple-800 dark:to-purple-600 rounded-b-xl rounded-t-2xl border-2 border-purple-400 dark:border-purple-500">
            {/* Liquid Animation */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-500 rounded-b-lg animate-[wave_2s_ease-in-out_infinite]" />
            
            {/* Bubbles */}
            <div className="absolute bottom-2 left-4 w-2 h-2 bg-white/50 rounded-full animate-[bubble_1.5s_ease-in-out_infinite]" />
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-white/50 rounded-full animate-[bubble_2s_ease-in-out_infinite_0.5s]" />
            <div className="absolute bottom-6 left-1/2 w-2 h-2 bg-white/50 rounded-full animate-[bubble_1.8s_ease-in-out_infinite_0.8s]" />
          </div>
        </div>
        
        {/* Blender Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-gray-300 dark:bg-gray-600 rounded-t-xl" />
        
        {/* Spinning Blades */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-[spin_0.5s_linear_infinite]" />
        </div>
      </div>
      <p className="text-lg font-medium text-purple-700 dark:text-purple-300 animate-pulse">
        Blending your smoothie recipes...
      </p>
    </div>
  );
};
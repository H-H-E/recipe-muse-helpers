import { Beaker } from "lucide-react";

export const Header = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Beaker className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Pulp Picker
        </h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center leading-relaxed">
        You WILL drink the AI slop
      </p>
    </header>
  );
};
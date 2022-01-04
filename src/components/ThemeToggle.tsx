import React from "react";
import { useDarkMode } from "hooks/useDarkMode";

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="p-2 mr-2 transition duration-500 ease-in-out rounded-full">
      {isDarkMode ? (
        <button
          type="button"
          onClick={toggleDarkMode}
          className="text-2xl text-gray-500 cursor-pointer dark:text-gray-400"
        >
          🌞
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleDarkMode}
          className="text-2xl text-gray-500 cursor-pointer dark:text-gray-400"
        >
          🌙
        </button>
      )}
    </div>
  );
};

export default ThemeToggle;

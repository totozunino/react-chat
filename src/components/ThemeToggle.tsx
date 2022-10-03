import { FC } from "react";
import { useDarkMode } from "hooks/useDarkMode";

const ThemeToggle: FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="p-2 mr-2 transition duration-500 ease-in-out rounded-full">
      {isDarkMode ? (
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 text-2xl text-gray-500 transition-all rounded-lg cursor-pointer dark:text-gray-400 hover:bg-slate-700"
        >
          🌞
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 text-2xl text-gray-500 transition-all rounded-lg cursor-pointer dark:text-gray-400 hover:bg-gray-100"
        >
          🌙
        </button>
      )}
    </div>
  );
};

export default ThemeToggle;

import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useLocalStorageState(
    "light",
    "theme"
  );

  useEffect(() => {
    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(`${currentTheme}-mode`);
  }, [currentTheme]);
  const changeTheme = (newTheme) => {
    setCurrentTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

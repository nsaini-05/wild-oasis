import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
function DarkModeToggle() {
  const { currentTheme, changeTheme } = useContext(ThemeContext);

  return (
    <ButtonIcon
      onClick={() => changeTheme(currentTheme == "dark" ? "light" : "dark")}
    >
      {currentTheme === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;

import { useTheme } from "../config/ThemeContext";

export default function useThemedStyles(makeStyles) {
  const { theme } = useTheme();
  return makeStyles(theme);
}
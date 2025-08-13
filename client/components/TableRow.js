import React from "react";
import { View, StyleSheet } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeContext";
import AppText from "../config/AppText";

function TableRow({ even, odd, icon, size, label, value }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  const evenOdd = () => {
    if (even) return theme.even;
    else return theme.odd;
  };

  return (
    <View style={[styles.container, { backgroundColor: evenOdd() }]}>
      <View style={[styles.iconAndLabel]}>
        <MaterialCommunityIcons
          name={icon}
          size={size}
          color={theme.main_text}
        ></MaterialCommunityIcons>
        <AppText style={styles.text}>{label}</AppText>
      </View>
      <AppText style={styles.text}>{value}</AppText>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      flexWrap:'wrap'
    },
    iconAndLabel: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,

      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    text: {
      color: theme.main_text,
      fontSize: 18,
      fontWeight: "bold",
    },
  });

export default TableRow;

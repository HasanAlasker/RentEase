import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../config/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeContext";
import useThemedStyles from "../hooks/useThemedStyles";

function EditDeleteBtn({ type, onPress }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  const backcolor = () => {
    switch (type) {
      case "edit":
        return theme.green;
      default:
        return theme.red;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: backcolor() }]}
      onPress={onPress}
    >
      <AppText style={styles.text}>{type === "edit" ? "تعديل" : "حذف"}</AppText>
      <MaterialCommunityIcons
        style={styles.icon}
        name={type === "edit" ? "pencil-outline" : "delete-outline"}
        size={22}
        color={theme.always_white}
      ></MaterialCommunityIcons>
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal:12,
      paddingVertical:6,
      borderRadius:10,
      gap:5,
    },
    text: {
      fontSize: 20,
      color: theme.always_white,
      fontWeight: "bold",
    },
  });

export default EditDeleteBtn;

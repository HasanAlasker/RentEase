import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import useThemedStyles from "../hooks/useThemedStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeContext";
import AppText from "../config/AppText";
import TableRow from "./TableRow";

function PostComp({ userName, contractStart, anualRent, numberOfPayments, }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  const [fullPost, setFullPost] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setFullPost((prev) => !prev)}
    >
      <View style={styles.top}>
        <View style={styles.nameAndIcon}>
          <MaterialCommunityIcons
            name="account-outline"
            size={30}
            color={theme.blue}
          ></MaterialCommunityIcons>
          <AppText style={styles.text}>{userName}</AppText>
        </View>
        <MaterialCommunityIcons
          name={
            fullPost
              ? "chevron-up-circle-outline"
              : "chevron-down-circle-outline"
          }
          size={30}
          color={theme.blue}
        ></MaterialCommunityIcons>
      </View>
      {fullPost && (
        <View style={styles.table}>
          <TableRow icon={'file-document-outline'} size={20} label={'بداية العقد:'} value={contractStart} odd={true}></TableRow>
          <TableRow icon={'currency-usd'} size={22} label={'قيمة الأجار:'} value={'4554'} even={true}></TableRow>
          <TableRow icon={'content-copy'} size={18} label={'عدد الدفعات:'} value={'4'} odd={true}></TableRow>
          <TableRow icon={'clock-outline'} size={20} label={'موعد الدفعات:'} value={'2/3/2343'} even={true}></TableRow>
          <TableRow icon={'currency-usd'} size={22} label={'قيمة الدفعة:'} value={'6767'} odd={true}></TableRow>
        </View>
      )}
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.post,
      width: "90%",
      marginHorizontal: "auto",
      padding: 20,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: theme.blue,
    },
    top: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    nameAndIcon: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    text: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.blue,
    },
    table:{
      marginVertical:20
    }
  });

export default PostComp;

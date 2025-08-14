import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeContext";
import useThemedStyles from "../hooks/useThemedStyles";
import AppText from "../config/AppText";
import TableRow from "./TableRow";
import EditDeleteBtn from "./EditDeleteBtn";

function PostComp({ userName, contractStart, anualRent, numberOfPayments, numberOfCheques, dateOfCheques }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  const [fullPost, setFullPost] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.top}
        onPress={() => setFullPost((prev) => !prev)}
      >
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
      </TouchableOpacity>
      {fullPost && (
        <>
          <View style={styles.table}>
            <TableRow
              icon={"file-document-outline"}
              size={20}
              label={"بداية العقد:"}
              value={contractStart}
              odd={true}
            ></TableRow>
            <TableRow
              icon={"currency-usd"}
              size={22}
              label={"قيمة الأجار:"}
              value={anualRent}
              even={true}
            ></TableRow>
            <TableRow
              icon={"content-copy"}
              size={18}
              label={"عدد الدفعات:"}
              value={numberOfPayments}
              odd={true}
            ></TableRow>
            <TableRow
              icon={"clock-outline"}
              size={20}
              label={"موعد الدفعات:"}
              value={""}
              even={true}
            ></TableRow>
            <TableRow
              icon={"currency-usd"}
              size={22}
              label={"قيمة الدفعة:"}
              value={anualRent / numberOfPayments}
              odd={true}
            ></TableRow>
            <TableRow
              icon={"cash"}
              size={22}
              label={"عدد الشيكات:"}
              value={numberOfCheques}
              even={true}
            ></TableRow>
            <TableRow
              icon={"calendar"}
              size={20}
              label={"تواريخ الاستحقاق:"}
              value={dateOfCheques}
              odd={true}
            ></TableRow>
          </View>
          <View style={styles.row}>
            <EditDeleteBtn type={"edit"}></EditDeleteBtn>
            <EditDeleteBtn type={"delete"}></EditDeleteBtn>
          </View>
        </>
      )}
    </View>
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
      marginVertical: 15,
    },
    top: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap:12
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
    table: {
      marginVertical: 20,
    },
  });

export default PostComp;

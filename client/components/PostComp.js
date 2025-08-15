import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeContext";
import useThemedStyles from "../hooks/useThemedStyles";
import AppText from "../config/AppText";
import TableRow from "./TableRow";
import EditDeleteBtn from "./EditDeleteBtn";
import { usePosts } from "../config/PostsContext";
import EditPostModal from "./EditPostModal";

function PostComp({
  id, // Add id prop
  userName,
  contractStart,
  anualRent,
  numberOfPayments,
  numberOfCheques,
  dateOfCheques,
  payments,
  notes,
}) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  const [fullPost, setFullPost] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { removePost } = usePosts();

  // Function to calculate payment dates
  const calculatePaymentDates = () => {
    if (!contractStart || !numberOfPayments) return [];

    // Parse the contract start date (assuming DD/MM/YYYY format)
    const [day, month, year] = contractStart.split("/").map(Number);
    const startDate = new Date(year, month - 1, day); // month - 1 because JS months are 0-indexed

    // Calculate months between payments (12 months / number of payments)
    const monthsBetweenPayments = 12 / numberOfPayments;

    const paymentDates = [];

    for (let i = 0; i < numberOfPayments; i++) {
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(startDate.getMonth() + i * monthsBetweenPayments);

      // Format as DD/MM/YYYY
      const formattedDate = `${paymentDate.getDate().toString()}/${(
        paymentDate.getMonth() + 1
      ).toString()}`;
      paymentDates.push(formattedDate);
    }

    return paymentDates;
  };

  const paymentDates = calculatePaymentDates();

  const handleDelete = () => {
    Alert.alert("", "هل أنت متأكد من حذف هذا المستأجر؟", [
      { text: "إلغاء", style: "cancel" },
      {
        text: "حذف",
        style: "destructive",
        onPress: () => removePost(id), // Use id instead of postId
      },
    ]);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  // Prepare post data for editing - ensure values are properly handled
  const postData = {
    id,
    userName,
    contractStart: contractStart || "",
    anualRent: anualRent || "",
    numberOfPayments: numberOfPayments || "",
    numberOfCheques: numberOfCheques || "",
    dateOfCheques: dateOfCheques || "",
    payments: payments || "",  
    notes: notes || "",        
  };

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
          <AppText style={styles.text} numberOfLines={1}>
            {userName}
          </AppText>
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
              value={paymentDates}
              even={true}
            ></TableRow>
            <TableRow
              icon={"currency-usd"}
              size={22}
              label={"قيمة الدفعة:"}
              value={Math.round(anualRent / numberOfPayments)}
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
            <TableRow
              icon={"cash"}
              size={22}
              label={"الدفعات:"}
              value={payments}
              even={true}
            ></TableRow>
            <TableRow
              icon={"note-outline"}
              size={20}
              label={"ملاحظات:"}
              value={notes}
              odd={true}
            ></TableRow>
          </View>
          <View style={styles.row}>
            <EditDeleteBtn type={"edit"} onPress={handleEdit}></EditDeleteBtn>
            <EditDeleteBtn
              type={"delete"}
              onPress={handleDelete}
            ></EditDeleteBtn>
          </View>
        </>
      )}

      <EditPostModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        postData={postData}
      />
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
      marginVertical: 10,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,

      elevation: 8,
    },
    top: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    nameAndIcon: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      maxWidth: "72%",
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
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeContext";
import useThemedStyles from "../hooks/useThemedStyles";
import AppText from "../config/AppText";
import InputBox from "./InputBox";
import FormBtn from "./FormBtn";
import ErrorMessage from "./ErrorMessage";
import { usePosts } from "../config/PostsContext";
import { Formik } from "formik";
import * as Yup from "yup";

const editSchema = Yup.object().shape({
  contractStart: Yup.string()
    .trim()
    .matches(
      /^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/, // DD/MM/YYYY
      "Date must be in DD/MM/YYYY format"
    )
    .test("is-valid-date", "Invalid date", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    })
    .required("Contract start date is required"),

  anualRent: Yup.number()
    .typeError("Rent must be a number")
    .positive("Rent must be greater than zero")
    .required("Rent is required"),

  numberOfPayments: Yup.number()
    .typeError("Number of payments must be a number")
    .integer("Number of payments must be a whole number")
    .positive("Number of payments must be greater than zero")
    .required("Number of payments is required"),

  numberOfCheques: Yup.number()
    .typeError("Number of cheques must be a number")
    .integer("Number of cheques must be a whole number")
    .min(0, "Number of cheques cannot be negative"),

  dateOfCheques: Yup.string()
    .trim()
    .test("valid-dates", "Invalid date format", function(value) {
      if (!value || value === '') return true; // Allow empty
      
      // Split by comma and validate each date
      const dates = value.split(',').map(d => d.trim());
      for (let date of dates) {
        if (!/^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/.test(date)) {
          return false;
        }
        const [day, month, year] = date.split("/").map(Number);
        const dateObj = new Date(year, month - 1, day);
        if (dateObj.getFullYear() !== year || 
            dateObj.getMonth() !== month - 1 || 
            dateObj.getDate() !== day) {
          return false;
        }
      }
      return true;
    }),
});

function EditPostModal({ visible, onClose, postData }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  const { updatePost } = usePosts();
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setHasBeenSubmitted(true);
    
    try {
      // Update the post with new values
      const updatedPost = {
        ...postData,
        contractStart: values.contractStart,
        anualRent: values.anualRent.toString(),
        numberOfPayments: values.numberOfPayments.toString(),
        numberOfCheques: values.numberOfCheques ? values.numberOfCheques.toString() : "",
        dateOfCheques: values.dateOfCheques,
        updatedAt: new Date().toISOString(),
      };

      updatePost(postData.id, updatedPost);

      Alert.alert("", "تم تحديث البيانات بنجاح", [
        {
          text: "موافق",
          onPress: () => {
            setHasBeenSubmitted(false);
            onClose();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("خطأ", "حدث خطأ أثناء تحديث البيانات");
    } finally {
      setSubmitting(false);
    }
  };

  const FormikInput = ({
    name,
    placeholder,
    values,
    errors,
    handleChange,
    handleBlur,
    keyboardType,
    multiline = false,
  }) => {
    const shouldShowError = hasBeenSubmitted && errors[name];
    return (
      <>
        <InputBox
          placeholder={placeholder}
          value={values[name]}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          keyboardType={keyboardType}
          multiline={multiline}
          penOn={true}
        />
        {shouldShowError && <ErrorMessage error={errors[name]} />}
      </>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <AppText style={styles.title}>تعديل بيانات المستأجر</AppText>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons
                name="close"
                size={30}
                color={theme.main_text}
              />
            </TouchableOpacity>
          </View>

          <Formik
            initialValues={{
              contractStart: postData?.contractStart || "",
              anualRent: postData?.anualRent || "",
              numberOfPayments: postData?.numberOfPayments || "",
              numberOfCheques: postData?.numberOfCheques || "",
              dateOfCheques: postData?.dateOfCheques || "",
            }}
            validationSchema={editSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <View style={styles.formContainer}>
                <FormikInput
                  name="contractStart"
                  placeholder="بداية العقد (DD/MM/YYYY)"
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  keyboardType="numeric"
                />

                <FormikInput
                  name="anualRent"
                  placeholder="قيمة الأجار السنوي"
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  keyboardType="numeric"
                />

                <FormikInput
                  name="numberOfPayments"
                  placeholder="عدد الدفعات"
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  keyboardType="numeric"
                />

                <FormikInput
                  name="numberOfCheques"
                  placeholder="عدد الشيكات (اختياري)"
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  keyboardType="numeric"
                />

                <FormikInput
                  name="dateOfCheques"
                  placeholder="تواريخ الشيكات (DD/MM/YYYY, DD/MM/YYYY...)"
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  multiline={true}
                />

                <View style={styles.buttonContainer}>
                  <FormBtn
                    title={isSubmitting ? "جاري التحديث..." : "حفظ التغييرات"}
                    onPress={() => {
                      setHasBeenSubmitted(true);
                      handleSubmit();
                    }}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  />
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={onClose}
                    disabled={isSubmitting}
                  >
                    <AppText style={styles.cancelText}>إلغاء</AppText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: theme.background,
      width: "90%",
      maxHeight: "80%",
      borderRadius: 20,
      padding: 20,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      paddingBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.main_text,
    },
    formContainer: {
      gap: 15,
    },
    buttonContainer: {
      marginTop: 20,
      gap: 10,
    },
    cancelBtn: {
      backgroundColor: theme.secondary,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    cancelText: {
      color: theme.main_text,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default EditPostModal;
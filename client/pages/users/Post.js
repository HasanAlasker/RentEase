import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import SafeScreen from "../../components/SafeScreen";
import FullScreen from "../../components/FullScreen";
import Navbar from "../../components/Navbar";
import ErrorMessage from "../../components/ErrorMessage";
import InputBox from "../../components/InputBox";
import ScrollScreen from "../../components/ScrollScreen";

import { Formik } from "formik";
import * as Yup from "yup";
import FormBtn from "../../components/FormBtn";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .max(25, "Name must not exceed 25 characters")
    .matches(
      /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .trim()
    .required("Name is required"),

  contractStart: Yup.string()
    .matches(
      /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/\d{4}$/,
      "Date must be in DD/MM/YYYY format"
    )
    .test("is-valid-date", "Invalid date", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      // Check if JS rolled over to next month due to invalid date
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    })
    .required("Contract start date is required"),

  rent: Yup.number()
    .typeError("Rent must be a number")
    .positive("Rent must be greater than zero")
    .required("Rent is required"),

  numberOfPayments: Yup.number()
    .typeError("Number of payments must be a number")
    .integer("Number of payments must be a whole number")
    .positive("Number of payments must be greater than zero")
    .required("Number of payments is required"),
});

const FormikInput = ({
  name,
  placeholder,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  hasBeenSubmitted,
  penOn = false,
  keyboardType,
  autoCapitalize,
}) => {
  const shouldShowError = hasBeenSubmitted && errors[name];
  return (
    <>
      <InputBox
        placeholder={placeholder}
        penOn={penOn}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {shouldShowError && <ErrorMessage error={errors[name]} />}
    </>
  );
};

function Post(props) {
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setHasBeenSubmitted(true);
  };

  return (
    <SafeScreen>
      <ScrollScreen>
        <Formik
          initialValues={{
            name: "",
            contractStart: "",
            rent: "",
            numberOfPayments: "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <View style={styles.formContainer}>
              <FormikInput
                name="name"
                placeholder="اسم المستأجر"
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasBeenSubmitted={hasBeenSubmitted}
                penOn={true}
                autoCapitalize="words"
              />

              <FormikInput
                name="contractStart"
                placeholder="بداية العقد"
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasBeenSubmitted={hasBeenSubmitted}
                penOn={true}
                keyboardType="numeric"
              />

              <FormikInput
                name="rent"
                placeholder="قيمة الأجار"
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasBeenSubmitted={hasBeenSubmitted}
                penOn={true}
                keyboardType="numeric"
              />

              <FormikInput
                name="numberOfPayments"
                placeholder="عدد الدفعات"
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasBeenSubmitted={hasBeenSubmitted}
                penOn={true}
                keyboardType="numeric"
              />

              <FormBtn
                title={isSubmitting ? "إضافة المستأجر..." : "إضافة المستأجر"}
                onPress={() => {
                  setHasBeenSubmitted(true);
                  handleSubmit();
                }}
                disabled={isSubmitting}
                loading={isSubmitting}
              />
            </View>
          )}
        </Formik>
      </ScrollScreen>
      <Navbar></Navbar>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
  formContainer:{
    
  }
});

export default Post;

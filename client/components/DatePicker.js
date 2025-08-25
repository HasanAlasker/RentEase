import { useState } from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import useThemedStyles from "../hooks/useThemedStyles";

function DatePicker({ value, onDateChange, placeholder = "Select Date", hasError = false }) {
  const styles = useThemedStyles(getStyles);
  const [showPicker, setShowPicker] = useState(false);

  // Convert string date to Date object if needed
  const getDateValue = () => {
    if (!value) return new Date();
    if (value instanceof Date) return value;
    
    // Parse DD/MM/YYYY format
    const parts = value.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date();
  };

  const formatDateForDisplay = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate && onDateChange) {
      const formattedDate = formatDateForDisplay(selectedDate);
      onDateChange(formattedDate);
    }
  };

  const displayText = value ? formatDateForDisplay(getDateValue()) : placeholder;

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={[styles.container, hasError && styles.errorContainer]}
      >
        <Text style={[styles.text,]}>
          {displayText}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={getDateValue()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      borderRadius: 18,
      borderColor: theme.blue,
      borderWidth: 2,
      backgroundColor: theme.post,
      paddingVertical: 15,
      paddingHorizontal: 15,
      width: "90%",
      marginHorizontal: "auto",
      marginTop: 20,
      minHeight: 50,
      alignItems: 'center',
    },
    errorContainer: {
      borderColor: theme.error || '#ff4444',
    },
    text: {
      color: theme.blue,
      fontWeight: "bold",
      fontSize: 18,
      flex: 1,
      textAlignVertical: "center",
    },
    placeholderText: {
      color: theme.placeholder || theme.darker_gray,
      fontWeight: "normal",
    },
  });

export default DatePicker;
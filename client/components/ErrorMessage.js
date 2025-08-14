
import { View, StyleSheet } from "react-native";
import AppText from "../config/AppText";
import useThemedStyles from "../hooks/useThemedStyles";

function ErrorMessage({ error }) {
  const styles = useThemedStyles(getStyles);
  if (!error || error === '') {
    return null;
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.text}>{error}</AppText>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal:'auto',
    marginTop: 5,
  },
  text: {
    color: theme.red,
    fontWeight:'bold',
    fontSize: 14,
    paddingLeft:10
  },
});

export default ErrorMessage;
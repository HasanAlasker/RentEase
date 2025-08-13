import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import useThemedStyles from "../hooks/useThemedStyles";

function Navbar(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const styles = useThemedStyles(getStyles);

  return (
    <>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbarBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Feather
            name="home"
            size={30}
            style={[styles.icon, route.name === "Home" && styles.active]}
          />
          <Text style={[styles.text, route.name === "Home" && styles.active]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarBtn}
          onPress={() => navigation.navigate("Have")}
        >
          <Feather
            name="clipboard"
            size={30}
            style={[styles.icon, route.name === "Have" && styles.active]}
          />
          <Text style={[styles.text, route.name === "Have" && styles.active]}>
            Have
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarBtn}
          onPress={() => navigation.navigate("Post")}
        >
          <Feather
            name="plus-circle"
            size={30}
            style={[styles.icon, route.name === "Post" && styles.active]}
          />
          <Text style={[styles.text, route.name === "Post" && styles.active]}>
            Post
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarBtn}
          onPress={() => navigation.navigate("Book")}
        >
          <Feather
            name="calendar"
            size={30}
            style={[styles.icon, route.name === "Book" && styles.active]}
          />
          <Text style={[styles.text, route.name === "Book" && styles.active]}>
            Book
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarBtn}
          onPress={() => navigation.navigate("Profile")}
        >
          <Feather
            name="user"
            size={30}
            style={[styles.icon, route.name === "Profile" && styles.active]}
          />
          <Text
            style={[styles.text, route.name === "Profile" && styles.active]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}></View>
    </>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    navbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 22,
      backgroundColor: theme.post,
      paddingTop: 10,
      paddingBottom: 13,
      borderTopRightRadius: 22,
      borderTopLeftRadius: 22,
      height: 73,
      width: "100%",
      zIndex: 100,

    },
    navbarBtn: {
      display: "flex",
      textAlign: "center",
      justifyContent: "space-between",
    },
    icon: {
      textAlign: "center",
      color: theme.sec_text,
      fontWeight: "900",
    },
    text: {
      color: theme.sec_text,
      fontWeight: "700",
      fontSize: 12,
      textAlign: "center",
    },
    active: {
      color: theme.purple,
    },
    bottom: {
      position: "absolute",
      width: "100%",
      backgroundColor: theme.post,
      height: 50,
      bottom: 0,
      zIndex: 90,
    },
  });

export default Navbar;

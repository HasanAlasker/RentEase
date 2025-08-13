import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { ThemeProvider, useTheme } from "./config/ThemeContext";

import Home from "./pages/users/Home";
import Post from "./pages/users/Post";

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false, animation: "none" }}
  >
    <Stack.Screen name="Home" component={Home}></Stack.Screen>
    <Stack.Screen name="Post" component={Post}></Stack.Screen>
  </Stack.Navigator>
);

const AppContent = () => {
  const { isDarkMode } = useTheme(); // I put it here because it needs to be inside
  // the theme provider to work other wise it will say "isDarkMode undefined"

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});

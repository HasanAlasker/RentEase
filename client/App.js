import { useEffect, useState } from "react";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { ThemeProvider, useTheme } from "./config/ThemeContext";
import { PostProvider } from "./config/PostsContext";

import Home from "./pages/users/Home";
import Post from "./pages/users/Post";

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      animation: "none",
      animationTypeForReplace: "pop", // Always pop since RTL is constant
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Post" component={Post} />
  </Stack.Navigator>
);

const AppContent = () => {
  const { isDarkMode } = useTheme();

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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setupRTL = async () => {
      try {
        const alreadyApplied = await AsyncStorage.getItem("rtlApplied");

        if (!I18nManager.isRTL && !alreadyApplied) {
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);

          await AsyncStorage.setItem("rtlApplied", "true");

          // Restart the app to apply RTL permanently
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.warn("RTL setup error:", error);
      } finally {
        setIsReady(true);
      }
    };

    setupRTL();
  }, []);

  if (!isReady) return null; // Optional splash

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PostProvider>
          <AppContent />
        </PostProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

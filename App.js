import { StatusBar, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StackNavigator } from "./src/navigation";
import { Storage, Themes, useGlobalState, AppContext } from "./src/resources";
import { createGlobalState } from "./src/resources";
import Toast from "react-native-toast-message";

createGlobalState({
  darkMode: false,
  uploadModalVisibility: true,
  userData: {},
});

const toastConfig = {
  // "error": (internalState) => <ErrorMessage header={internalState.text1} text={internalState.text2}/>,
};

export default () => {
  const appDefaultMode = useColorScheme();
  const [darkMode, setDarkMode] = useGlobalState("darkMode");

  useEffect(() => {
    setDarkMode(appDefaultMode === "dark");
    const setModeToAsyncStorage = async () => await Storage.setItem("darkMode", darkMode.toString());
    setModeToAsyncStorage();
  }, [appDefaultMode]);

  const theme = darkMode ? Themes.dark : Themes.light;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"}
                 backgroundColor={"transparent"}
                 translucent={true}
      />
      <AppContext.Provider value={{ scheme: theme, setDarkMode, darkMode }}>
        <NavigationContainer theme={theme}>
          <SafeAreaView edges={["bottom"]}
                        style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <StackNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </AppContext.Provider>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

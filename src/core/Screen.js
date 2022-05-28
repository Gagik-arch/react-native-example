import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = ({
                  children,
                  style,
                  contentContainerStyle = {},
                  edges = ["top", "left", "right"],
                  header = <></>,
                  footer = <></>,
                  disableScroll = false,
                  backgroundColor,
                  bottomTabsIsEnable = false,
                }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView edges={edges}
                    style={{
                      flex: 1,
                      paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                      backgroundColor,
                    }}
      >
        {header}
        <View style={[s.container]}>
          {
            disableScroll ?
              <View style={{
                flex: 1,
                paddingBottom: bottomTabsIsEnable ? 16 : 0, // BottomTabBar vertically padding is 20px (- 4px)
                ...style,
              }}>
                {children}
              </View> :
              <ScrollView
                contentProps={{ keyboardDismissMode: "interactive", keyboardShouldPersistTaps: true }}
                style={style}
                contentContainerStyle={{
                  paddingBottom: bottomTabsIsEnable ? 16 : 0, // BottomTabBar vertically padding is 20px (- 4px)
                  ...contentContainerStyle,
                }}
              >
                {children}
              </ScrollView>
          }
        </View>
        {footer}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
});

export default Screen;

import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
export const DismissKeyboard = ({ children }) => (
  <KeyboardAvoidingView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{children}</ScrollView>
  </KeyboardAvoidingView>
);

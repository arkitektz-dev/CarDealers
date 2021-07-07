import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../../Screens/LoginScreen/Index";
import { SignupScreen } from "../../Screens/SignUp";
import MainScreen from "../../Screens/LoginScreen/Main";
import ForgotPassword from "../../Screens/ForgotPassword";
import ChangePassword from "../../Screens/ForgotPassword/ChangePassword";

const LoginStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default LoginStack;

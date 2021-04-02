import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../../Screens/LoginScreen/Index";
import { SignupScreen } from "../../Screens/SignUp";

const LoginStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
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

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./HomeStack";

const IndexStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyAd"
        component={MyAd}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default IndexStack;

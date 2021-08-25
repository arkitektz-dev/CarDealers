import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CarScreen from "../../Screens/Car";
import DetailCarScreen from "../../Screens/Car/Details";
import AddCar from "../../Screens/Forms/AddCar";
import MyAd from "../../Screens/MyAd/Listing";

const CarStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListCarScreen"
        component={CarScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          title: "Car",
        }}
      />

      <Stack.Screen
        name="DetailCarScreen"
        component={DetailCarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCar"
        component={AddCar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default CarStack;

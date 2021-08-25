import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyAds from "../../Screens/MyAd/Listing";
import DetailCarScreen from "../../Screens/Car/Details";
import AddCar from "../../Screens/Forms/AddCar";

const AddCarStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddCar"
        component={AddCar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyAds"
        component={MyAds}
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
    </Stack.Navigator>
  );
};
export default AddCarStack;

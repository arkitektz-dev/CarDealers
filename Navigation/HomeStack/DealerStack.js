import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DealerScreen from "../../Screens/Dealer";
import ListingDealer from "../../Screens/Dealer/Listing";

const DealerStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListingDealer"
        component={ListingDealer}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="DealerScreen" component={DealerScreen} />
    </Stack.Navigator>
  );
};
export default DealerStack;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DealerScreen from "../../Screens/Dealer";

const DealerStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="DealerScreen" component={DealerScreen} />
    </Stack.Navigator>
  );
};
export default DealerStack;

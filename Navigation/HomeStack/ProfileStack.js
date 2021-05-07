import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../Screens/DrawerScreen/Profile";
import EditProfile from '../../Screens/DrawerScreen/EditProfile';

const ProfileStack = () => {
    const Stack = createStackNavigator();
  
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
      
      </Stack.Navigator>
    );
  };
  export default ProfileStack;
  
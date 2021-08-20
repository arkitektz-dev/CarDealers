import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native";

const DealerShowroomProfile = ({ route }) => {
  useEffect(() => {
    console.log(route.params);
  }, []);
  return (
    <View>
      <Text>Hey</Text>
    </View>
  );
};
export default DealerShowroomProfile;

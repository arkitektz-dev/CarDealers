import React from "react";
import LottieView from "lottie-react-native";
const LottieLoader = () => {
  return (
    <LottieView source={require("../../Assets/lottie.json")} autoPlay loop />
  );
};
export default LottieLoader;

import React, { useCallback } from "react";

import Slider from "@react-native-community/slider";

// {min,max,step,onValueChange}
const SliderData = ({ min, max, onValueChange }) => {
  return (
    <Slider
      renderToHardwareTextureAndroid={true}
      onValueChange={onValueChange}
      style={{ width: 200, height: 40 }}
      step={1}
      minimumValue={min}
      maximumValue={max}
      minimumTrackTintColor="#1c2e65"
      maximumTrackTintColor="#000000"
    />
  );
};
export default SliderData;

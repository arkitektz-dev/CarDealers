import React, { useCallback } from "react";
import RangeSlider from "rn-range-slider";

import Thumb from "./Thumb";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Notch from "./Notch";
import Label from "./Label";

// {min,max,step,onValueChange}
const SliderData = () => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  return (
    // <Slider
    //   renderToHardwareTextureAndroid={true}
    //   onValueChange={onValueChange}
    //   style={{ width: 200, height: 40 }}
    //   step={1}
    //   minimumValue={min}
    //   maximumValue={max}
    //   minimumTrackTintColor="#1c2e65"
    //   maximumTrackTintColor="#000000"
    // />
    <RangeSlider
      style={{ width: 160, height: 80 }}
      gravity={"center"}
      min={200}
      max={1000}
      step={20}
      selectionColor="#3df"
      blankColor="#f618"
      onValueChanged={(low, high, fromUser) => {
        console.log({ rangeLow: low, rangeHigh: high });
      }}
    />
  );
};
export default SliderData;

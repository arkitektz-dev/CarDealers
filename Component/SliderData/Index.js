import React, { useCallback } from "react";
// import Slider from 'rn-range-slider';
// import Thumb from './Thumb'
// import Rail from './Rail'
// import RailSelected from './RaliSelected'
// import Notch from './Notch'
// import Label from './Label'
import Slider from "@react-native-community/slider";

// {min,max,step,onValueChange}
const SliderData = ({ min, max, onValueChange }) => {
  // const renderThumb = useCallback(() => <Thumb/>, []);
  // const renderRail = useCallback(() => <Rail/>, []);
  // const renderRailSelected = useCallback(() => <RailSelected/>, []);
  // const renderLabel = useCallback(value => <Label text={value}/>, []);
  // const renderNotch = useCallback(() => <Notch/>, []);
  // const handleValueChange = useCallback((low, high) => {
  //   setLow(low);
  //   setHigh(high);
  // }, []);
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
    // <Slider
    //   min={}
    //   max={}
    //   step={step}
    //   allowLabelOverflow
    //   floatingLabel
    //   renderThumb={renderThumb}
    //   renderRail={renderRail}
    //   renderRailSelected={renderRailSelected}
    //   renderLabel={renderLabel}
    //   renderNotch={renderNotch}
    //   onValueChanged={onValueChange}
    // />
  );
};
export default SliderData;

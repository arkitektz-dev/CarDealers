import React, { useCallback, useState } from "react";

import { screenWidth } from "../../Global/Dimension";
import { ScrollView } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const SliderData = ({ onValueChanged,enabledOne, enabledTwo, values,max,step }) => {
  const [allowScroll, setAllowScroll] = useState(true);

  const enableScroll = () => setAllowScroll(true);
  const disableScroll = () => setAllowScroll(false);
  return (
    <ScrollView
      scrollEnabled={allowScroll}
      contentContainerStyle={{
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <MultiSlider
        sliderLength={screenWidth * 0.7}
        values={values}
        min={0}
        max={max ? max : 10000000}
        isMarkersSeparated={true}
        enabledTwo={enabledTwo}
        enabledOne={enabledOne}
        step={step ? step : 25000}
        onValuesChange={onValueChanged}
        onValuesChangeStart={enableScroll}
        onValuesChangeFinish={disableScroll}
      />
    </ScrollView>
  );
};
export default SliderData;

import React, { useCallback, useState } from "react";

import { screenWidth } from "../../Global/Dimension";
import { ScrollView } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const YearSliderData = ({ onValueChanged, enabledTwo, values }) => {
  const [allowScroll, setAllowScroll] = useState(true);

  const enableScroll = () => setAllowScroll(true);
  const disableScroll = () => setAllowScroll(false);
  return (
    <ScrollView
      scrollEnabled={allowScroll}
      contentContainerStyle={{
        alignItems: "center",
        top: 10,
        flexDirection: "column",
      }}
    >
      <MultiSlider
        sliderLength={screenWidth * 0.7}
        values={values}
        min={1980}
        max={2024}
        step={1}
        isMarkersSeparated={true}
        enabledTwo={enabledTwo}
        onValuesChange={onValueChanged}
        onValuesChangeStart={enableScroll}
        onValuesChangeFinish={disableScroll}
      />
    </ScrollView>
  );
};
export default YearSliderData;

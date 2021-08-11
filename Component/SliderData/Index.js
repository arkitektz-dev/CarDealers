import React, { useCallback, useState } from "react";

import { screenWidth } from "../../Global/Dimension";
import { ScrollView } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const SliderData = ({ onValueChanged, min, max, step }) => {
  const [allowScroll, setAllowScroll] = useState(true);

  const enableScroll = () => setAllowScroll(true);
  const disableScroll = () => setAllowScroll(false);
  return (
    <ScrollView
      scrollEnabled={allowScroll}
      contentContainerStyle={{
        alignItems: "center",
        top: 15,
        flexDirection: "column",
      }}
    >
      <MultiSlider
        sliderLength={screenWidth * 0.7}
        values={[0, 5000000]}
        min={0}
        max={5000000}
        isMarkersSeparated={true}
        enabledTwo={true}
        step={25000}
        onValuesChange={onValueChanged}
        onValuesChangeStart={enableScroll}
        onValuesChangeFinish={disableScroll}
      />
    </ScrollView>
  );
};
export default SliderData;

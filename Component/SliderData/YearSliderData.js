import React, { useCallback, useState } from "react";

import { screenWidth } from "../../Global/Dimension";
import { ScrollView } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const YearSliderData = ({ onValueChanged }) => {
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
        values={[1980, 2024]}
        min={1980}
        max={2024}
        step={1}
        isMarkersSeparated={true}
        enabledTwo={true}
        onValuesChange={onValueChanged}
        onValuesChangeStart={enableScroll}
        onValuesChangeFinish={disableScroll}
      />
    </ScrollView>
    // <ScrollView
    //   scrollEnabled={allowScroll}
    //   contentContainerStyle={{
    //     alignItems: "center",
    //     flexDirection: "column",
    //   }}
    // >
    //   <Slider
    //     renderThumb={renderThumb}
    //     renderRail={renderRail}
    //     renderRailSelected={renderRailSelected}
    //     // renderLabel={renderLabel}
    //     renderNotch={renderNotch}
    //     style={{
    //       width: screenWidth * 0.8,
    //       marginTop: "5%",
    //     }}
    //     gravity={"center"}

    //     selectionColor="#3df"
    //     blankColor="#f618"
    //     onValueChanged={onValueChanged}
    //     onTouchStart={() => {
    //       setAllowScroll(true);
    //     }}
    //     onTouchEnd={() => {
    //       setAllowScroll(true);
    //     }}
    //   />
    // </ScrollView>
  );
};
export default YearSliderData;

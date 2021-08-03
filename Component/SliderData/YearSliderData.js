import React, { useCallback, useState } from "react";

import Thumb from "./Thumb";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Notch from "./Notch";
import Label from "./Label";
import { screenWidth } from "../../Global/Dimension";
import { ScrollView } from "react-native";
import Slider from "rn-range-slider";

const YearSliderData = ({ onValueChanged }) => {
  const [allowScroll, setAllowScroll] = useState(true);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  // const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  return (
    <ScrollView
      scrollEnabled={allowScroll}
      contentContainerStyle={{
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Slider
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // renderLabel={renderLabel}
        renderNotch={renderNotch}
        style={{
          width: screenWidth * 0.8,
          marginTop: "5%",
        }}
        gravity={"center"}
        min={1980}
        max={2024}
        step={1}
        selectionColor="#3df"
        blankColor="#f618"
        onValueChanged={onValueChanged}
        onTouchStart={() => {
          setAllowScroll(true);
        }}
        onTouchEnd={() => {
          setAllowScroll(true);
        }}
      />
    </ScrollView>
  );
};
export default YearSliderData;

import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SkeletonLoader = () => {
  return (
    <SkeletonPlaceholder speed={800}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <View style={{ margin: 10, width: 250, height: 180 }} />
          <View style={{ marginLeft: 5 }}>
            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={{ margin: 10, width: 250, height: 180 }} />
          <View style={{ marginLeft: 5 }}>
            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={{ margin: 10, width: 250, height: 180 }} />
          <View style={{ marginLeft: 5 }}>
            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
            />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
export default SkeletonLoader;

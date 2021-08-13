import React, { memo, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ListItemSeparator from "../ItemSeperator/Index";
import { useNavigation } from "@react-navigation/core";
import SkeletonLoader from "../SkeletonPlaceholder/Index";
import HomeCard from "../CardViews/HomeProductListCard";
import {
  autoCapitalize,
  screenHeight,
  screenWidth,
} from "../../Global/Dimension";
import { fetchDealerData } from "../../Data/FetchData";
const DealerCard = () => {
  const [dealerData, setDealerData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDealerData().then((res) => {
      setDealerData(res.arr), setLoading(false);
    });
  }, []);

  const navigation = useNavigation();

  const onPressHandler = (item) => {
    navigation.navigate("DealerDetailScreen", { item });
  };
  const _renderItem = ({ item }) => {
    return (
      <HomeCard
        title={autoCapitalize(`${item.name}`)}
        price={item.contactInformation[0]}
        image={{ uri: item.images[0] }}
        pressHandler={() => onPressHandler(item)}
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
        padding: 10,
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={styles.heading}> OUR DEALERS</Text>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles.border}
            onPress={() => navigation.navigate("DealerStack")}
          >
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#828a9f" }}
            >
              {" View All "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <FlatList
          ItemSeparatorComponent={ListItemSeparator}
          data={dealerData}
          renderItem={_renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default memo(DealerCard);
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.15,
  },
  border: {
    right: "13%",
  },
  heading: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    left: "5%",
  },
});

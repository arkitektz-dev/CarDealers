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
import DealerHomeCard from "../CardViews/DealerHomeCard";
import {
  autoCapitalize,
  imageChecker,
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
      console.log(res.arr)
      setDealerData(res.arr), setLoading(false);
    });
  }, []);

  const navigation = useNavigation();

  const onPressHandler = (item) => {
    navigation.navigate("DealerDetailScreen", { item });
  };
  const _renderItem = ({ item }) => {
    return (
      <DealerHomeCard
        title={item.name ? autoCapitalize(`${item.name}`) : ""}
        price={item.phone}
        image={{ uri: imageChecker(item.image) }}
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
        <Text style={styles.heading}>Our Dealers</Text>
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
    fontFamily:"Lato-Black"
  },
});

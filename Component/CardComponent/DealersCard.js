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
        price={'+92 '+item.phone}
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
      }}
    >
      <View style={{flexDirection: "row",
          backgroundColor: "#F8F8F8",
          width: "100%",
          paddingBottom: 10,
          paddingTop: 25,
          paddingHorizontal: 20, }}>
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
              style={{ fontSize: 15, color: "#606884",fontFamily:"Roboto-Medium" }}
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
    borderWidth: 1,
    borderColor: "#606884",
    borderRadius: 5,
  },
  heading: {
    color: "#333",
    fontSize: 18,
    fontFamily:"Roboto-Bold"
  },
});

import React, { memo, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import SkeletonLoader from "../SkeletonPlaceholder/Index";
import ListItemSeparator from "../ItemSeperator/Index";
import { useNavigation } from "@react-navigation/core";
import HomeCard from "../CardViews/HomeProductListCard";
import { screenHeight, screenWidth } from "../../Global/Dimension";
import { fetchCarData } from "../../Data/FetchData";
import changeNumberFormat from "../Converter";
import Sold from "../../Assets/Sold.png";
const Card = () => {
  const [dataCar, setDataCar] = useState([]);
  const [loading, setLoading] = useState(false);
  const createSub = (t1, t2, t3) => {
    let text = t1;
    if (t2 !== undefined && t2 !== "" && t2 !== null) {
      text = text + " | " + t2;
    }
    if (t3 !== undefined && t3 !== "" && t3 !== null) {
      text = text + " | " + t3;
    }
    return text;
  };
  useEffect(() => {
    setLoading(true);
    fetchCarData().then((data) => {
      setDataCar(data.arr), setLoading(false);
    });
  }, []);

  const navigation = useNavigation();
  const onPressHandler = (item) => {
    navigation.navigate("DetailCarScreen", { item });
  };
  const _renderItem = ({ item }) => {
    return (
      <HomeCard
        title={`${item.vehicle.information.make +
          " " +
          item.vehicle.information.model +
          " " +
          item.vehicle.information.modelYear} `}
        price={changeNumberFormat(item.amount)}
        subtitle={createSub(
          item.vehicle.city,
          item.vehicle.mileage,
          item.vehicle.additionalInformation.engineType
        )}
        image={{ uri: item.images[0] }}
        sold={item.sold ? Sold : null}
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
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F8F8F8",
          width: "100%",
          paddingBottom: 10,
          paddingTop: 25,
          paddingHorizontal: 15,
        }}
      >
        <Text style={styles.heading}>Our Cars</Text>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles.border}
            onPress={() => navigation.navigate("CarStack")}
          >
            <Text
              style={{ fontSize: 15, color: "#606884" }}
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
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={ListItemSeparator}
          data={dataCar}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default memo(Card);
const styles = StyleSheet.create({
  imageSize: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.15,
  },
  heading: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    left: "5%",
  },
  border: {
    borderWidth: 1,
    borderColor: "#606884",
    borderRadius: 5,
  },
});

import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Card from "../../Component/CardViews/Card";
import { SearchComponent } from "../../Component/Search";
import { ActivityIndicator } from "react-native-paper";
import { screenWidth } from "../../Global/Dimension";
import { fetchShowroomData } from "../../Data/FetchData";

const ListingShowroom = ({ route }) => {
  const [showroomdata, setShowroomData] = useState([]);
  const [showroomCount, setshowroomCount] = useState(0);
  const [filteredData, setfilteredData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchShowroomData().then((data) => {
      setShowroomData(data.arr);
      setfilteredData(data.arr);
      setshowroomCount(data.size);
      setLoading(false);
    });
  }, []);
  const navigation = useNavigation();
  const searchShowroom = (text) => {
    if (text) {
      const newData = dataCar.filter((item) => {
        return (
          item.vehicle.information.make.toLowerCase(text).indexOf(text) >= 0 ||
          item.vehicle.information.model.toLowerCase(text).indexOf(text) >= 0
        );
      });

      setDataCar(newData);
    } else {
      setDataCar(filteredData);
    }
  };

  const onPressHandler = (item) => {
    navigation.navigate("ShowroomDetailScreen", { item });
  };
  const _renderItem = ({ item }) => {
    return (
      <Card
        onPressHandler={() => onPressHandler(item)}
        image={item.images[0]}
        title={item.name}
        subTitle={item.location}
      />
    );
  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <StatusBar hidden={false} animated={true} />
      <View style={styles.searchHolder}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            left: 10,
            top: 10,
            backgroundColor: "#fff",
            width: 35,
            height: 35,
            borderRadius: 35 / 2,
          }}
        ></TouchableOpacity>
        <View style={styles.distance}></View>

        <SearchComponent
          style={styles.search}
          onChangeHandler={(text) => searchShowroom(text)}
        />
      </View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Text
          style={{
            color: "#333",
            display: "flex",
            fontWeight: "800",
            fontSize: 18,
          }}
        >
          {showroomCount} Results
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator color="red" size="small" />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: "30%" }}
          data={showroomdata}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};
export default ListingShowroom;
const styles = StyleSheet.create({
  imageSize: {
    borderRadius: 15,
    backgroundColor: "white",
    marginBottom: 20,
    overflow: "hidden",
  },
  imageHolder: {
    alignSelf: "flex-start",
    height: 200,
    overflow: "hidden",
    width: 400,
  },
  searchHolder: {
    backgroundColor: "red",
    flexDirection: "row",
    flexGrow: 1,
  },
  search: {
    width: "75%",
    borderRadius: 5,
    maxHeight: "72%",

    alignSelf: "center",
  },
  distance: {
    width: screenWidth * 0.09,
  },
});

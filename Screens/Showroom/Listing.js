import React, { memo, useEffect, useState } from "react";
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
import { fetchMoreShowroom, fetchShowroomData } from "../../Data/FetchData";

const ListingShowroom = ({ route }) => {
  const [showroomdata, setShowroomData] = useState([]);
  const [showroomCount, setshowroomCount] = useState(0);
  const [filteredData, setfilteredData] = useState([]);
  const [moreloading, setMoreLoading] = useState(false);
  const [startAfter, setStartAfter] = useState(Object);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchShowroomData().then((data) => {
      setShowroomData(data.arr);
      setStartAfter(data.lastVal);
      setfilteredData(data.arr);
      setshowroomCount(data.size);
      setLoading(false);
    });
  }, []);
  const navigation = useNavigation();

  const searchShowroom = (text) => {
    if (text) {
      const newData = showroomdata.filter((item) => {
        const itemData = `${item.location.toUpperCase()}   
         ${item.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setShowroomData(newData);
    } else {
      setShowroomData(filteredData);
    }
  };

  const onPressHandler = (item) => {
    navigation.navigate("ShowroomDetailScreen", { item });
  };
  const _renderFooter = () => {
    if (moreloading) return true;

    return (
      <ActivityIndicator
        size="large"
        color="red"
        style={{ marginBottom: 10 }}
      />
    );
  };
  const _onEndReached = () => {
    setMoreLoading(true);
    fetchMoreShowroom(startAfter).then((res) => {
      setShowroomData([...showroomdata, ...res.arr]);
      setshowroomCount(showroomdata.length + res.arr.length);
      setStartAfter(res.lastVal);
      setMoreLoading(false);
    });
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
          ListFooterComponent={_renderFooter}
          onEndReached={_onEndReached}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
        />
      )}
    </View>
  );
};
export default memo(ListingShowroom);
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
    textAlignVertical: "center",
    alignSelf: "center",
  },
  distance: {
    width: screenWidth * 0.09,
  },
});

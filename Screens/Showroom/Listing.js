import React, { memo, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/core";
import Card from "../../Component/CardViews/Card";
import { SearchComponent } from "../../Component/Search";
import { ActivityIndicator } from "react-native-paper";
import { screenWidth } from "../../Global/Dimension";
import LottieView from "lottie-react-native";

import { fetchMoreShowroom, fetchShowroomData } from "../../Data/FetchData";
import { RefreshControl } from "react-native";

const ListingShowroom = ({ route }) => {
  const [showroomdata, setShowroomData] = useState([]);
  const [showroomCount, setshowroomCount] = useState(0);
  const [filteredData, setfilteredData] = useState([]);
  const [moreloading, setMoreLoading] = useState(false);
  const [startAfter, setStartAfter] = useState(Object);
  const [datalength, setDatalength] = useState(0);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noData, setNoData] = useState(false);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setLoading(true);
    fetchShowroomData().then((data) => {
      setShowroomData(data.arr);
      setStartAfter(data.lastVal);
      setfilteredData(data.arr);
      setDatalength(data.size);
      setshowroomCount(data.size);
      setLoading(false);
    });
  }, []);
  const navigation = useNavigation();

  const searchShowroom = () => {
    if (searchText) {
      const newData = showroomdata.filter((item) => {
        const itemData = `${item.location.toUpperCase()}   
         ${item.name.toUpperCase()}`;
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setShowroomData(newData);
      setshowroomCount(newData.length);
    } else {
      setShowroomData(filteredData);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetchShowroomData().then((data) => {
      setShowroomData(data.arr);
      setStartAfter(data.lastVal);
      setfilteredData(data.arr);
      setDatalength(data.size);
      setshowroomCount(data.size);
      setRefreshing(false);
    });
  };
  const onPressHandler = (item) => {
    navigation.navigate("ShowroomDetailScreen", { item });
  };
  const _renderFooter = () => {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {datalength == 10 ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={_onEndReached}
            style={styles.loadMoreBtn}
          >
            <Text style={styles.btnText}>Load More</Text>
            {moreloading ? (
              <ActivityIndicator color="#1c2e65" style={{ marginLeft: 8 }} />
            ) : null}
          </TouchableOpacity>
        ) : (
          <View style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>No More Data</Text>
          </View>
        )}
      </View>
    );
  };
  const _onEndReached = () => {
    setMoreLoading(true);
    fetchMoreShowroom(startAfter).then((res) => {
      setShowroomData([...showroomdata, ...res.arr]);
      setDatalength(res.arr.length);
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
        subTitle={item.city}
      />
    );
  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={styles.searchHolder}>
        <IonIcon
          style={{ margin: 10 }}
          name="chevron-back-circle-sharp"
          color="white"
          size={35}
          onPress={() => navigation.goBack()}
        />

        <SearchComponent
          style={styles.search}
          onChangeHandler={(text) => setSearchText(text)}
          onSearchPress={searchShowroom}
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
        <LottieView
          source={require("../../Assets/CarLoader.json")}
          autoPlay
          resizeMode="contain"
          style={{
            alignSelf: "center",
            width: 140,
            height: 140,
          }}
          hardwareAccelerationAndroid={true}
        />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: "30%" }}
          data={showroomdata}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={_renderFooter}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      {noData ? <Text>No More Data</Text> : null}
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
    backgroundColor: "#1c2e65",
    flexDirection: "row",
    flexGrow: 1,
  },
  loadMoreBtn: {
    padding: 10,
    borderColor: "#1c2e65",
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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

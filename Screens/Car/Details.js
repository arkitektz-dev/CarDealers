import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import Drawer from "../../Assets/Drawer.png";
const imagecontainerWidth = screenWidth;
const imagecontainerHeight = screenHeight * 0.3;

const DetailCarScreen = ({ route }) => {
  const item = route.params.item;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          source={Drawer}
          resizeMode="contain"
          style={{
            width: 60,
            height: 60,
            alignSelf: "flex-end",
          }}
        />
      </TouchableOpacity>
      <View style={styles.imageHolder}>
        <Image source={item.image} style={styles.imageSize} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{item.amount}</Text>
        <Text style={styles.location}>{item.city}</Text>
      </View>
      <ScrollView>
        <View style={styles.detailView}>
          <View style={styles.CarInfoTitle}>
            <Text style={styles.carInfoText}>Car Information</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styles.subDataRow}>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Model Year</Text>
                  <Text style={styles.txt1}>{item.model}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Transmission</Text>
                  <Text style={styles.txt1}>{item.Transmission}</Text>
                </View>
              </View>
              {/* <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Transmission</Text>
                  <Text style={styles.txt1}>{item.model}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "red",
                    height: screenHeight * 0.06,
                  }}
                >
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Engine Type</Text>
                  <Text style={styles.txt1}>{item.milage}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Engine Capacity</Text>
                  <Text style={styles.txt1}>{item.model}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Registration City</Text>
                  <Text style={styles.txt1}>{item.milage}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "red",
                    height: screenHeight * 0.06,
                  }}
                >
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Body Type</Text>
                  <Text style={styles.txt1}>{item.model}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Exterior Color</Text>
                  <Text style={styles.txt1}>{item.milage}</Text>
                </View>
              </View> */}
            </View>

            <View style={styles.subDataRow}>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Milage</Text>
                  <Text style={styles.txt1}>{item.milage}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Engine Type</Text>
                  <Text style={styles.txt1}>{item.engineType}</Text>
                </View>
              </View>
              {/* <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Transmission</Text>
                  <Text style={styles.txt1}>{item.model}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "red",
                    height: screenHeight * 0.06,
                  }}
                >
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Engine Type</Text>
                  <Text style={styles.txt1}>{item.milage}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Engine Capacity</Text>
                  <Text style={styles.txt1}>{item.model}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Registration City</Text>
                  <Text style={styles.txt1}>{item.milage}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "red",
                    height: screenHeight * 0.06,
                  }}
                >
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Body Type</Text>
                  <Text style={styles.txt1}>{item.model}</Text>
                </View>
              </View>
              <View style={styles.subData}>
                <View style={styles.line}>
                  <Text>|</Text>
                </View>
                <View style={{ width: 10 }}></View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.h1}>Exterior Color</Text>
                  <Text style={styles.txt1}>{item.milage}</Text>
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default DetailCarScreen;
const styles = StyleSheet.create({
  subData: {
    margin: 10,
    flexDirection: "row",
  },
  line: {
    flexDirection: "column",
    backgroundColor: "red",
    height: screenHeight * 0.06,
  },
  h1: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
  },
  txt1: {
    color: "grey",
    fontSize: 15,
    fontWeight: "800",
  },
  subDataRow: {
    marginTop: 5,
    flexDirection: "column",
    // justifyContent: "space-around",
  },
  carInfoText: {
    fontWeight: "bold",
    fontSize: 21,
    color: "white",
    marginBottom: 5,
  },
  CarInfoTitle: {
    flexDirection: "row",
    backgroundColor: "red",
    width: "50%",
    justifyContent: "center",
  },
  detailView: {
    flexDirection: "column",
    flex: 1,
  },
  title: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 24,
  },
  location: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
  },
  imageSize: {
    width: imagecontainerWidth + 30,
    height: imagecontainerHeight + 30,
    resizeMode: "contain",
    alignSelf: "center",
  },
  imageHolder: {
    width: imagecontainerWidth,
    height: imagecontainerHeight,
    borderBottomWidth: 0.4,
    opacity: 2,
    shadowColor: "grey",
    shadowOpacity: 2,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titleContainer: {
    margin: 10,
    borderBottomWidth: 0.4,
    opacity: 2,
    shadowColor: "grey",
    shadowOpacity: 2,
  },
});

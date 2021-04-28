// import React from "react";
// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get("window").height;
// const imagecontainerWidth = screenWidth;
// const imagecontainerHeight = screenHeight * 0.3;
// const Test = ({ title, data }) => {
//   return (
//     <View style={styles.subDataRow}>
//       <View style={styles.subData}>
//         <View style={styles.line}>
//           <Text>|</Text>
//         </View>
//         <View style={{ width: 10 }}></View>

//         <View style={{ flexDirection: "column" }}>
//           <Text style={styles.h1}>{title}</Text>
//           <Text style={styles.txt1}>{data}</Text>
//         </View>
//       </View>
//       {Object.keys(item).map(function (keyName, keyIndex) {
//         console.log(keyName);
//         return <Text>{keyName}</Text>;
//       })}
//       {/* <View style={styles.subData}>
//         <View style={styles.line}>
//           <Text>|</Text>
//         </View>
//         <View style={{ width: 10 }}></View>

//         <View style={{ flexDirection: "column" }}>
//           <Text style={styles.h1}>Milage</Text>
//           <Text style={styles.txt1}>{item.milage}</Text>
//         </View>
//       </View>
//       <View style={styles.subData}>
//         <View style={styles.line}>
//           <Text>|</Text>
//         </View>
//         <View style={{ width: 10 }}></View>

//         <View style={{ flexDirection: "column" }}>
//           <Text style={styles.h1}>Transmission</Text>
//           <Text style={styles.txt1}>{item.model}</Text>
//         </View>
//       </View>
//       <View style={styles.subData}>
//         <View
//           style={{
//             flexDirection: "column",
//             backgroundColor: "red",
//             height: screenHeight * 0.06,
//           }}
//         >
//           <Text>|</Text>
//         </View>
//         <View style={{ width: 10 }}></View>

//         <View style={{ flexDirection: "column" }}>
//           <Text style={styles.h1}>Engine Type</Text>
//           <Text style={styles.txt1}>{item.milage}</Text>
//         </View>
//       </View>
//       <View style={styles.subData}>
//         <View style={styles.line}>
//           <Text>|</Text>
//         </View>
//         <View style={{ width: 10 }}></View>

//         <View style={{ flexDirection: "column" }}>
//           <Text style={styles.h1}>Engine Capacity</Text>
//           <Text style={styles.txt1}>{item.model}</Text>
//         </View>
//       </View>
//       <View style={styles.subData}>
//         <View style={styles.line}>
//           <Text>|</Text>
//         </View>
//         <View style={{ width: 10 }}></View>

//         <View style={{ flexDirection: "column" }}>
//           <Text style={styles.h1}>Registration City</Text>
//           <Text style={styles.txt1}>{item.milage}</Text>
//         </View>
//       </View>
//       <View style={styles.subData}>
//         <View
//           style={{
//             flexDirection: "column",
//             backgroundColor: "red",
//             height: screenHeight * 0.06,
//           }}
//         >
//           <Text>|</Text>
//         </View>
//         <View style={{ width: 10 }}></View>

//         <View style={{ flexDirection: "column" }}>
//           <Text style={styles.h1}>Body Type</Text>
//           <Text style={styles.txt1}>{item.model}</Text>
//         </View>
//       </View>
//       <View style={styles.subData}>
//         <View style={styles.line}>
//           <Text>|</Text>
//         </View>
//         <View style={{ width: 10 }}></View>
//         <View style={{ flexDirection: "column" }}>
//           <Text style={styles.h1}>Exterior Color</Text>
//           <Text style={styles.txt1}>{item.milage}</Text>
//         </View>
//       </View> */}
//     </View>
//   );
// };
// export default Test;
// const styles = StyleSheet.create({
//   subData: {
//     margin: 10,
//     flexDirection: "row",
//   },
//   line: {
//     flexDirection: "column",
//     backgroundColor: "red",
//     height: screenHeight * 0.06,
//   },
//   h1: {
//     color: "grey",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   txt1: {
//     color: "grey",
//     fontSize: 15,
//     fontWeight: "800",
//   },
//   subDataRow: {
//     marginTop: 5,
//     flexDirection: "column",
//     // justifyContent: "space-around",
//   },
//   carInfoText: {
//     fontWeight: "bold",
//     fontSize: 21,
//     color: "white",
//     marginBottom: 5,
//   },
//   CarInfoTitle: {
//     flexDirection: "row",
//     backgroundColor: "red",
//     width: "50%",
//     justifyContent: "center",
//   },
//   detailView: {
//     flexDirection: "column",
//     flex: 1,
//   },
//   title: {
//     color: "grey",
//     fontWeight: "bold",
//     fontSize: 24,
//   },
//   location: {
//     color: "grey",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   price: {
//     color: "red",
//     fontWeight: "bold",
//     fontSize: 20,
//   },
//   imageSize: {
//     width: imagecontainerWidth + 30,
//     height: imagecontainerHeight + 30,
//     resizeMode: "contain",
//     alignSelf: "center",
//   },
//   imageHolder: {
//     width: imagecontainerWidth,
//     height: imagecontainerHeight,
//     borderBottomWidth: 0.4,
//     opacity: 2,
//     shadowColor: "grey",
//     shadowOpacity: 2,
//   },
//   container: {
//     flex: 1,
//     flexDirection: "column",
//   },
//   titleContainer: {
//     margin: 10,
//     borderBottomWidth: 0.4,
//     opacity: 2,
//     shadowColor: "grey",
//     shadowOpacity: 2,
//   },
// });

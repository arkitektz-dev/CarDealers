import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import Navbar from "../../Component/Navbar.js/Index";
import firestore from "@react-native-firebase/firestore";

const ShowroomProfile = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const paramshowroomId = route.params.item.id.id;
  useEffect(() => {
    const fetchData = async () => {
      const arr = [];
      const ref = firestore().collection("Showrooms");
      await ref.get().then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          let showroomid;
          if (typeof documentSnapshot.id == "string") {
            showroomid = documentSnapshot.id.toString().trim();
          } else {
            showroomid = documentSnapshot.id.split("/")[1];
          }
          const id = paramshowroomId.toString();
          if (showroomid == id) {
            arr.push(documentSnapshot.data());
          }
        });
        setData(arr);
      });
    };
    fetchData();
  }, []);
  const _renderItem = ({ item }) => {
    return (
      <View>
        <Text style={{ color: "#333" }}>{item.name}</Text>
        <Text>{item.location}</Text>
        <Text>{item.email}</Text>
        <Text>{item.contactInformation}</Text>
      </View>
    );
  };
  return (
    <View>
      <Navbar Title="Showroom" goBack={() => navigation.goBack()} />
      <FlatList
        data={data}
        renderItem={_renderItem}
        contentContainerStyle={{
          borderColor: "red",
          backgroundColor: "yellow",
          padding: 30,
          borderWidth: 3,
        }}
      />
    </View>
  );
};
export default ShowroomProfile;

import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import Card from "../Component/Card";

// import Screen from "../components/Screen";
import colors from "../config/colors";

const listings = [
  {
    id: 1,
    title: "HSKB Motors",
    price:
      "Hamid Hussain Farooqi Rd, P.E.C.H.S Block 2 Block 2 PECHS, Karachi, Karachi City, Sindh",
    image:
      "https://www.thenews.com.pk//assets/uploads/updates/2019-04-08/455172_5914137_26_updates.jpg",
  },
  {
    id: 2,
    title: "Couch in great condition for sale",
    price: 1000,
    image:
      "https://www.thenews.com.pk//assets/uploads/updates/2019-04-08/455172_5914137_26_updates.jpg",
  },
];

function ListingsScreen(props) {
  return (
    <View style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({item}) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={item.image}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;

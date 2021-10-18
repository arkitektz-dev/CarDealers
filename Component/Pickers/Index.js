import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import AppText from "../AppText";
import PickerItem from "./PickerItem";
import defaultStyles from "../../config/styles";
import Screen from "./Screen";
import { screenWidth } from "../../Global/Dimension";
import Feather from "react-native-vector-icons/Feather";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

const AppPicker = ({
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
  title,
  initialIcon,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }, style]}>
          {initialIcon}

          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <Feather name="chevron-down" size={25} color="#333" />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}
        animationType="fade"
        transparent={true}
      >
        <View
          style={{
            flex: 1,

            backgroundColor: "rgba(0,0,0,0.7)",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <View style={styles.dropdownHeader}>
            <Text
              style={{
                color: "#000000",
                fontSize: 16,
              }}
            >
              Select {title}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  color: "#1e2d64",
                  fontSize: 16,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          {items?.length !== 0 ? (
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              numColumns={numberOfColumns}
              style={styles.form_container}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.checkerItem}
                  activeOpacity={0.8}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      fontSize: 18,
                      fontWeight: "800",
                      marginTop: 5,
                    }}
                    key={(item, index) => index.toString()}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <ScrollView style={styles.form_container}>

            <Text
              style={{
                color: "grey",
                fontSize: 22,
                fontWeight: "800",
                marginTop: 80,
                textAlign:'center'
                
              }}
            >
              No {title} Available
            </Text>
            </ScrollView>
          )}
        </View>
      </Modal>
    </>
  );
};

export default AppPicker;
const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 8,

    width: screenWidth * 0.8,
    marginVertical: 12,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
  form_container: {
    paddingBottom: "20%",
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#000000",
    borderBottomWidth: 0.5,
    height: 55,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  checkerItem: {
    flexDirection: "row",
    marginTop: 9,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    paddingVertical: 7,
    minHeight: 52,
  },
});

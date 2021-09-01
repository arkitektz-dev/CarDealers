import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
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
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
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
        animationType="slide"
      >
        <Screen>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "#000000",
              borderBottomWidth: 0.5,
            }}
          >
            <Text
              style={{
                color: "#000000",
                margin: 10,
                fontSize: 16,
              }}
            >
              Select {title}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 16,
                  margin: 10,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <View
                style={{ borderBottomWidth: 1, borderBottomColor: "#000000" }}
              >
                <PickerItemComponent
                  item={item}
                  label={item.label}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectItem(item);
                  }}
                />
              </View>
            )}
          />
        </Screen>
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
});

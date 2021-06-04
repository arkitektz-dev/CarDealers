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

const AppPicker = ({
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <Feather name="chevron-down" size={25} color="#333" />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item.label);
                }}
              />
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
    padding: 15,
    width: screenWidth * 0.8,
    marginVertical: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
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

import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../../Component/Button/Index";
import { screenWidth } from "../../Global/Dimension";
import AppTextInput from "../../Component/TextInput/Index";
import { AddDemand, fetchDealerCar, getData } from "../../Data/FetchData";
import IonIcon from "react-native-vector-icons/Ionicons";
import AppPicker from "../../Component/Pickers/Index";
import ErrorHandle from "../../Component/HelperText";
import CategoryPickerItem from "../../Component/Picker/CategoryPickerItem";
import firestore from "@react-native-firebase/firestore";
import SliderData from "../../Component/SliderData/Index";

const AddDemandCar = ({ navigation }) => {
  const [dealerState, setDealerState] = useState("");
  const [dealerPicker, setDealerPicker] = useState("");
  const [dealerPickerID, setDealerPickerID] = useState("");
  const [rangePriceData, setRangePriceData] = useState();

  const [showroomData, setShowroomData] = useState({
    Make: "",
    Model: "",
    Price: "",
    Year: "",
  });
  const [errorState, setErrorState] = useState({
    Make: false,
    Model: false,
    Year: false,
  });
  const setUploadImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.error) {
        alert("Error");
      } else {
        const images = [];
        images.push(response.uri);
        setShowroomData({ ...showroomData, images: images });
      }
    });
  };
  var d;
  useEffect(() => {
    getData().then((res) => {
      setDealerPickerID(res.DealerId);
      setDealerPicker(res.name);
    });
  }, []);
  const onSubmitHandler = () => {
    // if (showroomData.price.substring(1, 6) == "00000") {
    //   d = showroomData.price.substring(0, s.length - 5);
    //   const c = `${d}lacs`;
    // } else {
    //   console.log("Sorry");
    // }

    const userRef = firestore()
      .collection("Dealers")
      .doc(dealerPickerID);

    const Dealer = {
      id: userRef,
      Name: dealerPicker,
    };
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const data = {
      Make: showroomData.Make,
      Model: showroomData.Model,
      Year: showroomData.Year,
      Price: `Rs.${numberWithCommas(showroomData.Price)}`,
    };
    const obj = {
      ...data,
      Dealer,

      // `Rs.${showroomData.Price}`
    };
    AddDemand(obj, navigation);
  };
  const onChangeMake = (e) => {
    if (e == "") {
      setErrorState({ Make: true });
    } else {
      setErrorState({ Make: false });
      setShowroomData({ ...showroomData, Make: e });
    }
  };
  const onChangeModel = (e) => {
    if (e == "") {
      setErrorState({ Model: true });
    } else {
      setErrorState({ Model: false });
      setShowroomData({ ...showroomData, Model: e });
    }
  };
  const onChangeYear = (e) => {
    if (e == "") {
      setErrorState({ Year: true });
    } else {
      setErrorState({ Year: false });
      setShowroomData({ ...showroomData, Year: e });
    }
  };
  return (
    <View style={styles.parent}>
      <View
        style={{ backgroundColor: "#1e2d64", flexDirection: "row", height: 50 }}
      >
        <IonIcon
          name="chevron-back-circle-sharp"
          color="white"
          size={35}
          style={{ margin: 5 }}
          onPress={() => navigation.goBack()}
        />

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              textAlignVertical: "center",
            }}
          >
            Add Demand Car
          </Text>
        </View>
      </View>
      <View style={styles.form}>
        <AppTextInput
          onChangeHandler={(e) => onChangeMake(e)}
          label="Make:"
          returnKeyType="next"
        />
        {errorState.name ? <ErrorHandle text="Field Can Not be empty" /> : null}
        <AppTextInput
          onChangeHandler={(e) => onChangeModel(e)}
          label="Model:"
          returnKeyType="next"
        />
        {errorState.location ? (
          <ErrorHandle text="Field Can Not be empty" />
        ) : null}
        <AppTextInput
          onChangeHandler={(e) => onChangeYear(e)}
          label="Year:"
          returnKeyType="next"
        />
        {errorState.contactInformation ? (
          <ErrorHandle text="Field Can Not be empty" />
        ) : null}
        <AppTextInput
          keyboardType={"number-pad"}
          onChangeHandler={(e) =>
            setShowroomData({ ...showroomData, Price: e })
          }
          label="Price:"
          returnKeyType="next"
        />
        {/* <View
          style={{
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, color: "#000000", top: 15 }}>
            Select Amount: Rs {rangePriceData} Lacs
          </Text>
          <View style={{ height: 20 }}></View>
          <SliderData
            min={0}
            max={100}
            onValueChange={(data) => setRangePriceData(data)}
          />
        </View> */}
        {/* <AppPicker
          items={dealerState}
          name="category"
          onSelectItem={(item) => {
            let dealerO = dealerState.filter((dealer) => item == dealer.label);
            setDealerPickerID(dealerO[0].value);
            setDealerPicker(dealerO[0].label);
          }}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Dealers"
          selectedItem={dealerPicker}
          width="80%"
        /> */}
        <Button
          title={"Submit"}
          onPressHandler={onSubmitHandler}
          style={styles.buttonContainer}
        />
      </View>
    </View>
  );
};
export default memo(AddDemandCar);
const styles = StyleSheet.create({
  parent: {
    backgroundColor: "white",
    flexDirection: "column",
    flex: 1,
  },
  form: {
    width: screenWidth * 0.7,
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#1e2d64",
  },

  distance: {
    width: screenWidth * 0.09,
  },
});

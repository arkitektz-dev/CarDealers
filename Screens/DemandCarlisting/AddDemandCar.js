import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../../Component/Button/Index";
import { screenWidth } from "../../Global/Dimension";
import AppTextInput from "../../Component/TextInput/Index";
import { AddDemand, fetchDealerCar, getData } from "../../Data/FetchData";
import IonIcon from "react-native-vector-icons/Ionicons";
import changeNumberFormat from "../../Component/Converter";
import ErrorHandle from "../../Component/HelperText";
import CategoryPickerItem from "../../Component/Picker/CategoryPickerItem";
import firestore from "@react-native-firebase/firestore";
import SliderData from "../../Component/SliderData/Index";
import { ActivityIndicator } from "react-native";
import YearSliderData from "../../Component/SliderData/YearSliderData";

const AddDemandCar = ({ navigation }) => {
  const [dealerState, setDealerState] = useState("");
  const [dealerPicker, setDealerPicker] = useState("");
  const [dealerPickerID, setDealerPickerID] = useState("");
  const [rangePriceData, setRangePriceData] = useState({ init: "", final: "" });
  const [yearRange, setYearRange] = useState({ init: "", final: "" });

  const [loader, setLoader] = useState(false);

  const [showroomData, setShowroomData] = useState({
    Make: "",
    Model: "",
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
  const onSubmitHandler = async () => {
    setLoader(true);
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
      Year: yearRange.init,
      Price: `${numberWithCommas(rangePriceData.init)}`,
    };
    const obj = {
      ...data,
      Dealer,
    };
    await AddDemand(obj)
      .then(() => {
        setLoader(false);
        navigation.navigate("DemandCars");
      })
      .catch(() => setLoader(false));
    setLoader(false);
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

  const handleValueYearChange = useCallback((low, high) => {
    setYearRange({ init: low });
  }, []);

  const handleValuePriceChange = useCallback((low, high) => {
    setRangePriceData({ init: low });
  }, []);

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
          label="Make"
          returnKeyType="next"
        />
        {errorState.name ? <ErrorHandle text="Field Can Not be empty" /> : null}
        <AppTextInput
          onChangeHandler={(e) => onChangeModel(e)}
          label="Model"
          returnKeyType="next"
        />
        {errorState.location ? (
          <ErrorHandle text="Field Can Not be empty" />
        ) : null}

        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 16,
                left: 35,
                top: 10,
              }}
            >
              Selected Amount: Rs {changeNumberFormat(rangePriceData.init)}
            </Text>
            <SliderData
              min={0}
              max={100000000}
              step={1000}
              onValueChanged={handleValuePriceChange}
            />
          </View>

          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 16,
                left: 35,
              }}
            >
              Select Year: {yearRange.init}
            </Text>
            <YearSliderData onValueChanged={handleValueYearChange} />
          </View>
        </View>

        <Button
          title={
            loader ? <ActivityIndicator size="small" color="#fff" /> : "Submit"
          }
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
    flex: 1,
    width: screenWidth,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#1e2d64",
  },

  distance: {
    width: screenWidth * 0.09,
  },
});

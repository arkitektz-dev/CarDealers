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
import { TextInput } from "react-native-gesture-handler";

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
    if (showroomData.Make != "" && showroomData.Model != "") {
      setLoader(true);
      await AddDemand(obj)
        .then(() => {
          setLoader(false);
          navigation.navigate("DemandCars");
        })
        .catch(() => setLoader(false));
      setLoader(false);
    } else {
      setLoader(false);

      alert("Fields can not be empty");
    }
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
    setYearRange({ init: low, final: high });
  }, []);

  const handleValuePriceChange = useCallback((low, high) => {
    setRangePriceData({ init: low, final: high });
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

        <View style={{ width: "100%", top: 15, flex: 1 }}>
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
                marginTop: 10,
              }}
            >
              Selected Amount:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <TextInput
                  value={rangePriceData.init.toString()}
                  style={styles.int}
                />
                <Text style={{ color: "#000000", top: 6 }}>
                  {changeNumberFormat(rangePriceData.init.toString())}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <TextInput
                  value={rangePriceData.final.toString()}
                  style={styles.int}
                />
                <Text style={{ color: "#000000", top: 6 }}>
                  {changeNumberFormat(rangePriceData.final.toString())}
                </Text>
              </View>
            </View>
            <SliderData onValueChanged={handleValuePriceChange} />
          </View>

          <View
            style={{
              flexDirection: "column",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 16,
                left: 35,
              }}
            >
              Select Year:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 15,
              }}
            >
              <TextInput value={yearRange.init.toString()} style={styles.int} />

              <TextInput
                value={yearRange.final.toString()}
                style={styles.int}
              />
            </View>
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
  int: {
    borderWidth: 1,
    borderColor: "#000000",
    width: screenWidth * 0.4,
    color: "#000000",
  },
});

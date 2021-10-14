import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text,Modal } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "../../Component/Button/Index";
import { screenWidth } from "../../Global/Dimension";
import AppTextInput from "../../Component/TextInput/Index";
import {
  AddCompanyMake,
  AddDemand,
  fetchDealerCar,
  getData,
} from "../../Data/FetchData";
import IonIcon from "react-native-vector-icons/Ionicons";
import changeNumberFormat from "../../Component/Converter";
import ErrorHandle from "../../Component/HelperText";
import CategoryPickerItem from "../../Component/Picker/CategoryPickerItem";
import firestore from "@react-native-firebase/firestore";
import SliderData from "../../Component/SliderData/Index";
import { ActivityIndicator } from "react-native";
import YearSliderData from "../../Component/SliderData/YearSliderData";
import { TextInput } from "react-native-gesture-handler";
import AppPicker from "../../Component/Pickers/Index";
import { useToast } from "native-base";

const AddDemandCar = ({ navigation, route }) => {
  const [make, setMake] = useState("");

  const toast = useToast();

  const [dealerPicker, setDealerPicker] = useState("");
  const [dealerPickerID, setDealerPickerID] = useState("");
  const [makeCompany, setCompany] = useState([]);

  const [rangePriceData, setRangePriceData] = useState({
    init: "0",
    final: "100000000",
  });
  const [yearRange, setYearRange] = useState({ init: "1980", final: "2024" });
  const [Model, setModel] = useState("");
  const [loader, setLoader] = useState(false);

  const carCompany = [
    { label: "Toyota", value: "Toyota", categoryId: 1 },
    { label: "Honda", value: "Honda", categoryId: 2 },
  ];
  const modelCar = [
    { label: "Corolla", value: "Corolla", categoryId: 1, versionId: 1 },
    { label: "Prius", value: "Prius", categoryId: 1, versionId: 1 },
    { label: "Aqua", value: "Aqua", categoryId: 1, versionId: 1 },
    { label: "Civic", value: "Civic", categoryId: 2, versionId: 2 },
    { label: "Reborn ", value: "Reborn", categoryId: 2, versionId: 3 },
  ];
  const [errorState, setErrorState] = useState({
    Make: false,
    Model: false,
    Year: false,
  });
  const [modelArr, setModelArr] = useState([]);

  const getCompanies = () => {
    AddCompanyMake().then((res) => {
      const arr = [];
      res.docs.forEach((item) =>
        arr.push({
          label: item.data().name,
          value: item.data().name,
        })
      );
      setCompany(arr);
    });
  };
  useEffect(() => {
    getCompanies();
    getData().then((res) => {
      setDealerPickerID(res.DealerId);
      setDealerPicker(res);
    });
  }, []);
  const onSubmitHandler = async () => {
    const userRef = firestore()
      .collection("Dealers")
      .doc(dealerPickerID);

    const Dealer = {
      id: userRef,
      Name: dealerPicker.name,
      image: dealerPicker.image,
    };
    const date = new Date();
    const data = {
      Make: make.label,
      Model: Model,
      minYear: yearRange.init,
      maxYear: yearRange.final,
      minPrice: `${rangePriceData.init}`,
      maxPrice: `${rangePriceData.final}`,
      adStatus: "Active",
      date:date
    };
    const obj = {
      ...data,
      Dealer,
    };
    if (make != "" && Model != "") {
      setLoader(true);
      await AddDemand(obj)
        .then(() => {
          setLoader(false);
          toast.show({
            title: "Demand added",
            status: "success",
            description: "Your demand has been added",
            duration: 1500,
            minWidth: "90%",
            isClosable: false,
          });
          navigation.navigate("Home");
        })
        .catch(() => setLoader(false));
      setLoader(false);
    } else {
      setLoader(false);
      alert("Fields can not be empty");
    }
  };
  const onChangeMake = (item) => {
    const body = modelCar.filter((e) => e.categoryId == item.categoryId);
    setModelArr(body);
    console.log(item);
    if (item.label == "") {
      setErrorState({ Make: true });
    } else {
      setErrorState({ Make: false });
      setMake(item);
      setModel("");
    }
  };
  const onChangeModel = (e) => {
    if (e == "") {
      setErrorState({ Model: true });
    } else {
      setErrorState({ Model: false });
      console.log(e);
      setModel(e.label);
    }
  };

  const handleValueYearChange = (e) => {
    setYearRange({ init: e[0], final: e[1] });
  };

  const handleValuePriceChange = (e) => {
    setRangePriceData({ init: e[0], final: e[1] });
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
              right: 15,
              textAlignVertical: "center",
            }}
          >
            Add Demand Car
          </Text>
        </View>
      </View>
      <View style={styles.form}>
        <AppPicker
          items={carCompany}
          name="category"
          onSelectItem={(item) => onChangeMake(item)}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Make"
          selectedItem={make.label}
          width="90%"
        />
        {errorState.name ? <ErrorHandle text="Field Can Not be empty" /> : null}
        <AppPicker
          items={modelArr}
          name="category"
          onSelectItem={(item) => onChangeModel(item)}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Model"
          selectedItem={Model}
          width="90%"
        />
        {errorState.location ? (
          <ErrorHandle text="Field Can Not be empty" />
        ) : null}

        <View style={{ width: "100%", marginBottom: 5 }}>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: "#000000",
                alignSelf: "center",
                marginVertical: 20,
              }}
            >
              Price Range: (PKR)
            </Text>
            <View style={styles.priceNum}>
              <View style={styles.priceHolder}>
                <Text style={styles.txt}>
                  {changeNumberFormat(rangePriceData.init.toString(), 2)}
                </Text>
              </View>
              <View style={styles.priceHolder}>
                <Text style={styles.txt}>
                  {changeNumberFormat(rangePriceData.final.toString(), 2)}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <SliderData
                values={[0, 100000000]}
                enabledTwo={true}
                onValueChanged={handleValuePriceChange}
                max={100000000}
                step={100000}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: "#000000",
                alignSelf: "center",
                marginBottom: 20,
                marginTop:-15
              }}
            >
              Select Year
            </Text>
            <View style={styles.priceNum}>
              <View style={styles.priceHolder}>
                <Text style={styles.txt}>{yearRange.init.toString()}</Text>
              </View>
              <View style={styles.priceHolder}>
                <Text style={styles.txt}>{yearRange.final.toString()}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <YearSliderData
                values={[1980, 2024]}
                enabledTwo={true}
                onValueChanged={handleValueYearChange}
              />
            </View>
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
    width: screenWidth * 0.37,
    color: "#000000",
    borderRadius: 10,
  },
  priceNum: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: "8%",
    alignItems: "center",
    marginBottom: 10,
  },
  priceHolder: {
    borderRadius: 7,
    backgroundColor: "#d3d3d3",
    width: "40%",
    height: 40,
    padding: 10,
  },
  txt: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "bold",
  },
});

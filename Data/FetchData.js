import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { string } from "yup";

export const fetchCarData = async () => {
  const arr = [];
  const ref = firestore().collection("Advertisments");
  var data = await ref.get();
  const size = data.size;
  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr };
};

export const fetchDealerData = async () => {
  const arr = [];
  const ref = firestore().collection("Dealers");
  const data = await ref.get();
  const size = data.size;

  data.forEach((res) => arr.push(res.data()));
  return { size, arr };
};

export const fetchShowroomData = async () => {
  const ref = firestore().collection("Showrooms");
  const arr = [];
  const data = await ref.get();
  const size = data.size;

  data.forEach((res) => arr.push(res.data()));
  return { size, arr };
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("userInfo");
    const data = JSON.parse(value);
    if (data !== null) {
      return data;
    }
  } catch (e) {
    alert(e);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    alert("Storage successfully cleared!");
  } catch (e) {
    alert("Failed to clear the async storage.");
  }
};

export const storeData = async (value) => {
  try {
    const data = JSON.stringify(value);
    return await AsyncStorage.setItem("userInfo", data);
  } catch (e) {
    alert(e);
  }
};
export const updateProfile = async (userinfo, userData) => {
  const { id } = userinfo;
  firestore()
    .collection("Users")
    .doc(id)
    .update(userData)
    .then(() => {
      alert("User updated!");
    });
};
export const updatePassword = async (userinfo, userData) => {
  const { id } = userinfo;
  firestore()
    .collection("Users")
    .doc(id)
    .update(userData)
    .then(() => {
      alert("User updated!");
    });
};
export const AddShowroomData = (showroomData) => {
  if (
    showroomData.name == "" ||
    showroomData.city == "" ||
    showroomData.contactInformation == ""
  )
    console.log("validation error occured");
  else console.log("no validation error found");

  // firestore()
  //   .collection("Showrooms")
  //   .add(showroomData)
  //   .then(() => {
  //     alert("Showroom Added");
  //   });
};

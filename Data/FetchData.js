import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchCarData = async () => {
  const arr = [];
  const ref = firestore()
    .collection("Advertisments")
    .where("featured", "==", true);
  var data = await ref.limit(5).get();
  const lastVal = data.docs[data.docs.length - 1];
  const size = data.size;
  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr, lastVal };
};

export const fetchDemandCarData = async () => {
  const arr = [];
  const ref = firestore().collection("Demand");

  var data = await ref.limit(5).get();
  const lastVal = data.docs[data.docs.length - 1];
  const size = data.size;
  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr, lastVal };
};

export const fetchMoreDemandCar = async (startAfter) => {
  const arr = [];
  const ref = firestore().collection("Demand");
  var data = await ref
    .startAfter(startAfter)
    .limit(5)
    .get();
  const lastVal = data.docs[data.docs.length - 1];
  const size = data.size;

  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr, lastVal };
};

// export const fetchCarList = async () => {
//   const arr = [];
//   const ref = firestore()
//     .collection("Advertisments")
//     .where("featured", "==", true);
//   var data = await ref.get();
//   const size = data.size;
//   data.forEach((res) => {
//     arr.push(res.data());
//   });

//   return { size, arr };
// };

//Fetch More Car Dealer Data
export const fetchMoreCar = async (startAfter) => {
  const arr = [];
  const ref = firestore()
    .collection("Advertisments")
    .where("featured", "==", true);
  var data = await ref
    .startAfter(startAfter)
    .limit(5)
    .get();
  const lastVal = data.docs[data.docs.length - 1];
  const size = data.size;

  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr, lastVal };
};
export const fetchMoreShowroom = async (startAfter) => {
  const ref = firestore()
    .collection("Showrooms")
    .where("feature", "==", true);
  const arr = [];
  var data = await ref
    .startAfter(startAfter)
    .limit(5)
    .get();
  const lastVal = data.docs[data.docs.length - 1];
  const size = data.size;
  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr, lastVal };
};

export const fetchDealerData = async () => {
  const arr = [];
  const ref = firestore()
    .collection("Dealers")
    .where("feature", "==", true);
  const data = await ref.get();
  const size = data.size;

  data.forEach((res) => {
    const obj = { ...res.data(), id: res.id };
    arr.push(obj);
  });
  return { size, arr };
};

export const fetchShowroomData = async () => {
  const ref = firestore()
    .collection("Showrooms")
    .where("feature", "==", true);
  const arr = [];
  const data = await ref.limit(5).get();
  const size = data.size;
  const lastVal = data.docs[data.docs.length - 1];

  data.forEach((res) => {
    const obj = { ...res.data(), id: res.id };
    arr.push(obj);
  });
  return { size, arr, lastVal };
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
  } catch (e) {
    alert("Failed to clear the async storage.");
  }
};

export const storeData = async (value) => {
  try {
    const data = JSON.stringify(value);
    return await AsyncStorage.setItem("userInfo", data);
  } catch (e) {
    console.log(e);
  }
};
export const updateProfile = async (userinfo, userData) => {
  const { id } = userinfo;
  if (userData.name == "" || userData.email == "") {
    alert("Fields Cant be empty");
  } else {
    firestore()
      .collection("Users")
      .doc(id)
      .update(userData)
      .then(() => {
        alert("User updated!");
      });
  }
};
export const updatePassword = async (userinfo, userData) => {
  console.log(userinfo, userData.confirmPassword);
  if (userData.password == "" && userData.confirmPassword == "") {
    alert("Fields can not be empty");
  } else {
    const { id } = userinfo;
    const obj = { password: userData.confirmPassword };
    return firestore()
      .collection("Users")
      .doc(id)
      .update(obj);
  }
};
export const AddShowroomData = (showroomData) => {
  if (
    showroomData.name == "" ||
    showroomData.location == "" ||
    showroomData.contactInformation == ""
  )
    alert("Fields can not be empty");
  else {
    firestore()
      .collection("Showrooms")
      .add(showroomData)
      .then(() => {
        alert("Showroom Added");
      });
  }
};
export const AddDemand = (obj, navigation) => {
  if (obj.Make == "" || obj.Model == "" || obj.Year == "")
    alert("Fields can not be empty");
  else {
    return firestore()
      .collection("Demand")
      .add(obj);
  }
};

export const AddCarData = async (obj) => {
  if (
    obj.vehicle.information.make == "" ||
    obj.vehicle.information.model == "" ||
    obj.vehicle.information.modelYear == ""
  ) {
    alert("Fields Can not be empty");
  } else {
    return firestore()
      .collection("Advertisments")
      .add(obj);
  }
};
export const fetchSpecificDealer = async (dealerId) => {
  return firestore()
    .collection("Dealers")
    .doc(dealerId)
    .get();
};
export const fetchShowroomCar = async () => {
  return await firestore()
    .collection("Showrooms")
    .get();
};
export const fetchDealerCar = async () => {
  return await firestore()
    .collection("Dealers")
    .get();
};
export const passwordReset = async (value, pass, navigation) => {
  console.log(pass);
  const obj = { password: pass };
  const ref = firestore()
    .collection("Users")
    .where("phone", "==", value);
  ref
    .get()
    .then((res) => {
      res.forEach((doc) =>
        firestore()
          .collection("Users")
          .doc(doc.id)
          .update(obj)
          .then(() => {
            alert("User updated!");
            navigation.replace("Home");
          })
      );
    })
    .catch((err) => console.log(err));
};

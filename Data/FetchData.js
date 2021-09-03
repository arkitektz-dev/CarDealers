import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchCarData = async () => {
  const arr = [];
  const ref = firestore().collection("Advertisments");
  // .where("featured", "==", true);
  var data = await ref.limit(20).get();
  const lastVal = data.docs[data.docs.length - 1];
  const size = data.size;
  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr, lastVal };
};

export const fetchCarListData = async () => {
  const arr = [];
  const ref = firestore().collection("Advertisments");
  var data = await ref
    .orderBy("date", "desc")
    .limit(20)
    .get();
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

export const AddDealer = async (data) => {
  const imagesArr = [];
  const contactInformation = [];
  contactInformation.push(data.phone);
  imagesArr.push(
    "https://cdn5.vectorstock.com/i/1000x1000/93/09/car-salesman-cartoon-vector-17209309.jpg"
  );
  const obj = {
    name: data.name,
    images: imagesArr,
    contactInformation: contactInformation,
    showrooms: data.showrooms,
  };
  return firestore()
    .collection("Dealers")
    .add(obj);
};

//Fetch More Car Dealer Data
export const fetchMoreCarSearch = async (startAfter, filter) => {
  const arr = [];
  var ref;
  if (filter != "") {
    ref = firestore()
      .collection("Advertisments")
      .where("vehicle.information.make", "==", filter);
  }

  var data = await ref
    .startAfter(startAfter)
    .limit(20)
    .get();
  const lastVal = data.docs[data.docs.length - 1];
  const size = data.size;

  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr, lastVal };
};
export const fetchMoreCar = async (startAfter, filter) => {
  const arr = [];
  var ref;
  if (filter.Make != "") {
    ref = firestore()
      .collection("Advertisments")
      .where("vehicle.information.make", "==", filter.Make);
  }
  if (filter.Model != "") {
    ref = firestore()
      .collection("Advertisments")
      .where("vehicle.information.model", "==", filter.Model);
  }
  if (filter.registrationCity != "") {
    ref = firestore()
      .collection("Advertisments")
      .where("vehicle.registrationCity", "==", filter.registrationCity);
  }
  if (filter.transmission != "") {
    ref = firestore()
      .collection("Advertisments")
      .where("vehicle.additionalInformation.transmission", "==", filter.transmission);
  }
  if (filter.Year != "") {
    ref = firestore()
      .collection("Advertisments")
      .where("vehicle.information.modelYear", "==", filter.Year);
  }

  if (filter.City != "") {
    ref = firestore()
      .collection("Advertisments")
      .where("vehicle.city", "==", filter.City);
  }
  if (filter.ExteriorColor != "") {
    ref = firestore()
      .collection("Advertisments")
      .where("vehicle.exteriorColor", "==", filter.ExteriorColor);
  }

  if (filter.initPrice > 0) {
    ref = ref.where("amount", ">", `${filter.initPrice}`);
    ref = ref.where("amount", "<", `${filter.finalPrice}`);
  }

  if (filter.Assemble != "") {
    ref = firestore()
      .collection("Advertisments")
      .where("vehicle.additionalInformation.assembly", "==", filter.Assemble);
  }

  var data = await ref
    .startAfter(startAfter)
    .limit(20)
    .get();
  const lastVal = data.docs[data.docs.length - 1];
  const size = data.size;

  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr, lastVal };
};
export const fetchMoreCarWithoutFilter = async (startAfter) => {
  const arr = [];
  const ref = firestore().collection("Advertisments");

  var data = await ref
    .orderBy("date", "desc")
    .startAfter(startAfter)
    .limit(20)
    .get();
  const lastVal = data.docs[data.docs.length - 1];
  const size = data.size;

  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr, lastVal };
};
export const fetchMoreCarWithSearch = async (startAfter, searchText) => {
  const arr = [];
  var ref;
  console.log(searchText);
  if (searchText != "") {
    ref = firestore()
      .collection("Advertisments")
      .where("vehicle.information.make", "==", searchText);
  }
  var data = await ref
    .startAfter(startAfter)
    .limit(20)
    .get();
  const lastVal = data.docs[data.docs.length - 1];
  const size = data.size;

  data.forEach((res) => {
    arr.push(res.data());
  });

  return { size, arr, lastVal };
};

export const fetchMoreDealer = async (startAfter) => {
  const arr = [];
  const ref = firestore().collection("Dealers");
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
  const ref = firestore().collection("Dealers");
  const data = await ref.limit(10).get();
  const lastVal = data.docs[data.docs.length - 1];

  const size = data.size;

  data.forEach((res) => {
    const obj = { ...res.data(), id: res.id };
    arr.push(obj);
  });
  return { size, arr, lastVal };
};

export const fetchShowroomData = async () => {
  const ref = firestore().collection("Showrooms");

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
  return firestore()
    .collection("Advertisments")
    .add(obj);
};

export const fetchSpecificDealer = async (dealerId) => {
  return firestore()
    .collection("Dealers")
    .doc(dealerId)
    .get();
};

export const fetchShowroomCar = async (value) => {
  return await firestore()
    .collection("Dealers")
    .doc(value.user)
    .get();
};

export const fetchDealerCar = async () => {
  return await firestore()
    .collection("Dealers")
    .get();
};

export const passwordReset = async (value, pass, navigation) => {
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

export const AddUser = (obj, id) => {
  const DealerId = firestore()
    .collection("Dealers")
    .doc(id);
  const data = { ...obj, DealerId };

  return firestore()
    .collection("Users")
    .add(data);
};

export const AddCompanyMake = async () => {
  return await firestore()
    .collection("Make")
    .get();
};

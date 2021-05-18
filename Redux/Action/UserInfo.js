import firestore from "@react-native-firebase/firestore";

export const UserInfo =()=>async(dispatch)=>{
    
    const ref = firestore().collection("Users");

    if (user.name == "" || user.password == "") {
      alert("Fields Can not be empty");
      setEmptyFieldError(true);
    } else {

      ref
        .where("username", "==", user.name)
        .where("password", "==", user.password)
        .get()
        .then(async(querySnapshot) => {
          querySnapshot.docs.forEach((doc) => 

          dispatch({type:'GET_INFO',payload:doc.data()}));
        global.user=true
          navigation.replace("Home");

        })
      
   
    }
}
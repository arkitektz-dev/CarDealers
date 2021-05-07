import React, { useEffect } from 'react'
import { View,Text, ScrollView,SafeAreaView,StyleSheet, Image } from 'react-native'
import ProfileLogo from '../../Assets/Profile.png'
const Profile = () =>{
  
  {/*  const [data,setData]=
    const fetchData = async () => {
        const ref = firestore().collection("Users");
        await ref.get().then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            arr.push(documentSnapshot.data());
          });
          setDataCar(arr);
        });
      };
    

    useEffect(()=>{

    },[])
    */}
    return(
       <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
           <ScrollView style={styles.container} 
           contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
           showsVerticalScrollIndicator={false}>
               <View>
               <Image
            source={ProfileLogo}
            style={{
              width: 85,
              height: 85,
            }}
          />
               </View>
           </ScrollView>
       </SafeAreaView>
    )
}
export default Profile
const styles=StyleSheet.create({
container:{
    flex:1,padding:20,backgroundColor:'#fff'
}
})
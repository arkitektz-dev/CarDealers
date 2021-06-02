import React from 'react'
import { StyleSheet,TouchableOpacity } from 'react-native'
import Feather  from "react-native-vector-icons/Feather";


const AddFormButton =({children, onPress})=>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.parent}> 
            <Feather name='plus' size={29} color='#fff' />
        </TouchableOpacity>
    )
}



const styles=StyleSheet.create({
    parent:{
        borderWidth:1,
        borderColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        width:65,
        height:65,
        backgroundColor:'red',
        borderRadius:50,
        bottom:18

    },
    child:{
        width:70,height:70,borderRadius:35,backgroundColor:'red'
    }
})
export default AddFormButton;
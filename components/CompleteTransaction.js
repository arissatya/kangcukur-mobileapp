import React from 'react'
import {
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from "react-native";
import colors from '../constants/colors'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CompleteTransaction({navigation}) {
  return (
    <View style={{flex:1, margin:"auto", alignItems:"center", alignContent:"center",alignSelf:"center", justifyContent: "center"}}>
      <TouchableOpacity onPress={() =>{navigation.navigate("Home")}}>
      <View style={{alignItems:"center", alignContent:"center",alignSelf:"center", justifyContent: "center", marginBottom: 30}}>
      <Image
        style={styles.fotoProfile}
        // src={}
        source={{
          uri:
            "https://images.unsplash.com/photo-1526614180703-827d23e7c8f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
        }}
      />
      </View>
      <Text style={{fontSize:40, fontWeight:"bold"}}>Thank You...</Text>
      <Text style={{fontSize:30, fontWeight:"bold"}}>Transaction Completed!</Text>
      <View style={{marginTop:35, alignItems:"center", alignContent:"center",alignSelf:"center", justifyContent: "center"}}>
      <Text>Tap anywhere to continue</Text>
    </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  textLink: {
    fontWeight: 'bold',
    color: colors.accent
  },
  fotoProfile: {
    borderRadius: 30,
    width: 190,
    height: 190,
  }
})


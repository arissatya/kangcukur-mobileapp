import React, {useState} from 'react'
import { StyleSheet, Text, View, Dimensions } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import Colors from "../../constants/colors"
import axios from "axios"

export default function Rating() {
  const [rating, setRating] = useState(1)
  const radio_props = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];



  return (
    <View style={{flex:1, margin:"auto", alignItems:"center", alignContent:"center",alignSelf:"center", justifyContent: "center"}}>
      <View style={{backgroundColor:Colors.accent, borderRadius:10, padding:20, elevation: 8}}>
      <Text style={{fontSize:40, fontWeight:"bold"}}>Thank you..</Text>
      <Text style={{fontSize:20, fontWeight:"bold"}}>Please rate my service</Text>
      <View style={styles.buttonOutline}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            labelHorizontal={false}
            buttonInnerColor={Colors.color3}
            buttonOuterColor={Colors.accent}
            buttonSize={15}
            buttonOuterSize={25}
            animation={true}
            onPress={(value) => {
              setRating(value);
            }}
          />
        </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: Colors.accent,
    padding: 10,
    width: "80%",
    borderRadius: 20,
    elevation: 8,
    marginTop: 30,
  },
  buttonOutline: {
    alignItems: "center",
    borderColor: Colors.base2,
    backgroundColor: Colors.base1,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    borderRadius: 20,
    marginTop: 20,
    elevation: 8
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonTextOutline: {
    color: Colors.accent,
    fontWeight: "bold",
    fontSize: 18,
  },
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import NumberFormat from 'react-number-format';
import Colors from "../constants/colors";

export default function VarianList({ item, addCukurVarian, reduceCukurVarian }) {

  const [jumlah, setJumlah] = useState(0);

  const addJumlah = () => {
    setJumlah(jumlah + 1);
    addCukurVarian(item)
  };
  const minJumlah = () => {
    if (jumlah > 0) {
      setJumlah(jumlah - 1);
      reduceCukurVarian(item)
    }
  };

  return (
    <View style={{ flexDirection: "row", flex: 1, marginVertical: 5, borderBottomColor:Colors.accent, borderBottomWidth:3, padding:4 }}>
      <View style={{ flexDirection: "column", flex: 4, marginBottom:8 }}>
        <Text style={{ color: Colors.color1, fontSize: 17, fontWeight:"bold"}}>{item.jenisCukur}</Text>
        <View style={{ alignSelf:"center", backgroundColor:Colors.base2, paddingHorizontal:30, paddingVertical:7, borderRadius:10, elevation:8, marginTop:10}}>
        <NumberFormat value={item.hargaCukur} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text style={{ color: Colors.color1, fontStyle:"italic"}}>{value}</Text>} />
        </View>
      </View>
      <View style={{ flexDirection: "column", flex: 2, alignContent:"center", alignContent:"center", alignItems:"center", justifyContent:"center", borderRadius:30 }}>
      {jumlah > 0 &&
        <NumberFormat value={jumlah} displayType={'text'} thousandSeparator={true} suffix={' pax'} renderText={value => <Text style={{ color: Colors.color1, fontSize: 15}}>{value}</Text>} />
      }
      </View>
      <View style={{ flexDirection: "column", flex: 2 }}>
        <Text style={{ justifyContent: "center" }}></Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{flexDirection: "column"}}>
          <TouchableOpacity onPress={addJumlah}>
            <FontAwesome name={"plus-circle"} size={35} color={Colors.color1} />
          </TouchableOpacity>
          </View>
          <View style={{flexDirection: "column", marginLeft:5}}>
          {jumlah !== 0 && (
            <TouchableOpacity onPress={minJumlah}>
              <FontAwesome
                name={"minus-circle"}
                size={35}
                color={Colors.cancelButton}
              />
            </TouchableOpacity>
          )}
          </View>
        </View>
      </View>
    </View>
  );
}

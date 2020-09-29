import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Colors from "../constants/colors";

const { width, height } = Dimensions.get("window");


export default function HistoryDetailCard({ navigation, item }) {
  //butuh di tempel data kang cukur


  return (
    <View style={styles.screen}>
      <View style={styles.infoDetail}>
              <View style={{ flexDirection: "column", flex: 4 }}>
                <Text style={styles.detailContent}>{item.jenisCukur}</Text>
              </View>
              {/* <Text style={styles.detailContent}>{item.hargaKetikaOrder}</Text> */}
            </View>
      <View style={styles.footer}>
          {item.TransactionDetails.map(item=>{
            // return <Text>{JSON.stringify(item.Varian.jenisCukur)}</Text>
            return <Text style={{ fontSize: 15, color: Colors.base2 }}>Servis: {item.Varian.jenisCukur}</Text>
          })}
      {/* <Text>{JSON.stringify(item)}</Text> */}
        <Text style={{ fontSize: 12, color: Colors.base2, marginTop:20}}>
        Tap card to close
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    color: "#303030",
    maxHeight: 400,
    width: width * 0.95,
    marginBottom: 15,
    borderBottomStartRadius:10,
    borderBottomEndRadius:10
  },
  infoDetail: {
    width: "80%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  footer: {
    alignItems: "center",
    textAlign: "center",
    color: Colors.base2,
    marginTop: 5,
  },
  detailContent: {
    // marginTop: 5,
    // color: Colors.color1,
    // fontSize: 14,
    // fontWeight: "bold"
  }});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

export default function DetailsCard({ navigation, item }) {
  //butuh di tempel data kang cukur
  return (
    <View style={styles.screen}>
      <View>
        {item.map((el) => {
          return (
            <View style={styles.infoDetail}>
              <View style={{ flexDirection: "column", flex: 4 }}>
                <Text style={styles.detailContent}>{el.Varian[0].jenisCukur}</Text>
              </View>
              <View style={{ flexDirection: "column", flex: 2 }}>
                <Text style={styles.detailContent}>
                  : {el.Varian[0].hargaCukur}
                </Text>
              </View>
              {/* <Text style={styles.detailContent}>{el.hargaKetikaOrder}</Text> */}
            </View>
          );
        })}
      </View>
      <View style={styles.footer}>
        <Text style={{ fontSize: 12, color: Colors.base2 }}>
          Tap card to close
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.accent,
    alignItems: "flex-start",
    alignItems: "center",
    color: "#303030",
    maxHeight: 400,
    width: "100%",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    elevation: 8
  },
  infoDetail: {
    width: 270,
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
    marginTop: 5,
    color: Colors.color1,
    fontSize: 14,
    fontWeight: "bold"
  }});

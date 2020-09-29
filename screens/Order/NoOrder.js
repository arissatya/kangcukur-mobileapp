import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import OrderCards from "../../components/OrderCards";
import Header from "../../components/Header";
import Colors from "../../constants/colors";
import { Col } from "native-base";

export default function NoOrder({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (

    <View style={styles.container}>
      <Header style={{ flex: 1 }} title="Order History" />

      <View style={styles.imageContainer}>

        <Image style={styles.image} source={{ uri: 'https://images.unsplash.com/photo-1460748491143-2a97bbf7e4a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' }} />

      </View>
      <View style={styles.paragraf}>
        <Text style={styles.textTitle}>
          No Orders Yet
        </Text>
        <Text style={styles.textParagraf}>
          Kembali ke halaman home untuk membuat order, atau nayalakan ketersediaan mu untuk bekerja. Semangat
        </Text>

      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Back To Home</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginVertical: 20,
    width: 200,
    height: 200,
    borderRadius: 200,
    // borderWidth: 3,
    // borderColor: 'black',
    overflow: 'hidden',
  },
  btnHeaderContainer: {
    flexDirection: 'row',
    width: '100%',

  },

  container: {
    backgroundColor: Colors.base1,
    alignItems: "center",
    color: Colors.color1,
    backgroundColor: Colors.base2,
    marginBottom: 240
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paragraf: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  textTitle: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.accent,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textParagraf: {
    color: '#303030',
    fontSize: 14,
    textAlign: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.accent,
    padding: 10,
    width: '80%',
    borderRadius: 20,
    elevation: 8,
  },
});
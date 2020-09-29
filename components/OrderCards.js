import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image, FlatList } from "react-native";
import Colors from "../constants/colors";
import DetailsCard from "./DetailsCard";
import dummyTransactionData from '../dummyTransactionData.json'
import { FontAwesome } from '@expo/vector-icons';

export default function OrderCards({ item }) {
  const [showDetail, setShowDetail] = useState(false);
  // const { customer, info, rating } = item


  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            style={styles.fotoProfile}
            source={{
              uri:
                "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
            }}
          />
          <View style={styles.text}>
            {/* <Text style={styles.title}>{customer}</Text> */}
            <Text style={styles.title}>{item.Customer.nama}</Text>
            <Text style={styles.info}>{item.status}</Text>
            <Text style={styles.info}>{item.createdAt}</Text>
            {/* <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={24} color={Colors.accent} />
              <Text style={styles.rating}>{rating}</Text>
            </View> */}
          </View>
        </View>
        {/* <View style={styles.btnDetail}>
          <Text style={styles.textLink}  onPress={toggleDetail}>Detail</Text>
        </View> */}
      </View>
      {/* <View style={{ flexDirection: "column", marginTop: 20 }}>
        {showDetail &&
          <FlatList
            data={dummyData}
            renderItem={({ item, index }) => {
              return <DetailsCard item={item.TransactionDetails} />;
            }}
            keyExtractor={(item, index) => `${index}`}
          />
        }
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  textLink: {
    fontWeight: 'bold',
    color: Colors.accent
  },
  fotoProfile: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.base1,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20

  },
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  text: {
    marginLeft: 20
  },
  title: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  info: {
    fontSize: 14
  },
  rating: {
    fontSize: 18,
    marginLeft: 10
  },
  ratingContainer: {
    marginTop: 5,
    flexDirection: 'row'
  }

});

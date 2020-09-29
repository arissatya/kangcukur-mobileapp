import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { TouchableOpacity, StyleSheet, Text, View, Image, FlatList } from "react-native"
import { FontAwesome } from "react-native-vector-icons";
import Colors from "../constants/colors"
import HistoryDetailCard from "./HistoryDetailCard"

export default function HistoryCard({ item, role }) {
  const [showDetail, setShowDetail] = useState(false)


  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  return (
    <TouchableOpacity onPress={toggleDetail}>
      <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Image
              style={styles.fotoProfile}
              source={{
                uri:
                  item.TukangCukur.urlPhoto || "https://images.unsplash.com/photo-1460748491143-2a97bbf7e4a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              }}
            />
            <View style={styles.text}>
              <Text style={styles.title}>{role === 'customer' ? item.Customer.nama : item.TukangCukur.nama}</Text>
              <Text style={styles.info}>{role === 'customer' ? item.Customer.telepon : item.TukangCukur.telepon}</Text>

              <Text style={styles.address}>{role === 'customer' ? item.Customer.alamat : 'Rating:'}</Text>
              {item.TukangCukur.rating !== 0 && <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={24} color={Colors.accent} />
                <Text style={styles.rating}>{String(item.TukangCukur.rating).length === 1 ? String(item.TukangCukur.rating)+'.0': String(item.TukangCukur.rating)}</Text>
              </View>}


            </View>
          </View>
          <View style={styles.btnDetail}>
            <Text style={styles.textLink}></Text>
          </View>
      </View>
        {!showDetail &&
          <View style={{flexDirection:"row",
          alignItems: "center",
          justifyContent: "center"
          }}>
            <TouchableOpacity onPress={() => setShowDetail(false)}>
              <HistoryDetailCard item={item} />
            </TouchableOpacity>
          </View>
        }
    </TouchableOpacity>
  )
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
    borderBottomWidth: 3,
    borderBottomColor: Colors.accent,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
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
})


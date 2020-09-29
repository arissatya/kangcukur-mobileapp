import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Button, StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../constants/colors'
import Card from '../../components/Card';
import Header from '../../components/Header';
import axios from "axios"
import { FontAwesome } from '@expo/vector-icons';

export default function OrderNotification({ navigation }) {
  const [nama, setNama] = useState('')
  const [telepon, setTelepon] = useState('')

  const [alamat, setAlamat] = useState('')
  const [rating, setRating] = useState(0)

  let role
  useFocusEffect(()=>{
      AsyncStorage.getItem('role')
      .then(data => {
        role = data
        return AsyncStorage.getItem('transaction_data')
      })
      .then(data=>{
        setNama(role === 'customer' ? data.Customer.nama : data.TukangCukur.nama)
        setTelepon(role === 'customer' ? data.Customer.telepon : data.TukangCukur.telepon)
        setAlamat(role === 'customer' ? data.Customer.telepon : "")
        setRating(role === 'customer' ? "" : data.TukangCukur.rating)
      })
      .catch(err=>console.log(err))
  }, [])


  if(!nama){
    return <ActivityIndicator
      size="large"
      color={Colors.accent}
      style={{flex:1, alignItems:"center", alignSelf:"center",alignContent:"center"}}
    />
  }

  return (
    <View style={styles.screen}>
      <Header title="You Have Been Matched!" />

      <Card style={styles.profileContainer}>
        <Image
          style={styles.fotoProfile}
          source={{
            uri: urlPhoto,
          }}
        />
        <Text style={styles.name}>{nama}</Text>
        <Text style={styles.phoneNumber}>{telepon}</Text>
        <Text style={styles.address}>{alamat || 'Rating:'}</Text>
        {rating !== 0 && <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={24} color={Colors.accent} />
          <Text style={styles.rating}>{String(rating).length === 1 ? String(rating)+'.0': String(rating)}</Text>
        </View>}
      </Card>

      <>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Order',{
            screen: 'Order'
          })}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </>
    </View>
  );
}

const styles = StyleSheet.create({

  btnContainer: {
    width: '80%',
    marginTop: 20,
  },
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  profileContainer: {
    width: '80%',
    alignItems: 'center',
    height: 200,
    marginTop: 100,
    marginBottom: 20
  },
  fotoProfile: {
    borderColor: 'black',
    borderRadius: 70,
    width: 120,
    height: 120,
    marginTop: -90,
  },
  name: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: "bold"
  },
  phoneNumber: {
    color: '#303030',
    fontSize: 14
  },
  address: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#303030'
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.accent,
    padding: 10,
    width: '80%',
    borderRadius: 20,
    elevation: 8,
  },
  buttonOutline: {
    alignItems: "center",
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 20,
    marginTop: 20
  },
  buttonText: {
    color: 'white'
  },
  buttonTextoutline: {
    color: Colors.accent
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



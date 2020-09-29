import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Button, StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../constants/colors'
import Card from '../../components/Card';
import Header from '../../components/Header';
import EditProfile from "../../components/EditProfile"
import axios from "axios"
import { FontAwesome } from '@expo/vector-icons';

export default function Profile({ navigation }) {
  const [nama, setNama] = useState('Yang Cukur')
  const [telepon, setTelepon] = useState('')
  const [alamat, setAlamat] = useState('Please login first')
  const [rating, setRating] = useState(0)
  const [isLogged, setIsLogged] = useState(false)
  const [token, setToken] = useState('')
  const [urlPhoto, setUrlPhoto] = useState('https://images.unsplash.com/photo-1460748491143-2a97bbf7e4a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

  const [showEdit, setShowEdit] = useState(false)

  useFocusEffect(()=>{
    checkAccess_token()
    if (isLogged) {
      AsyncStorage.getItem('role')
      .then(role=>{
        return axios({
          method: "GET",
          url: `https://tukangcukur.herokuapp.com/${role}`,
          headers: {
            access_token: token
          }
        })
      })
      .then(({data})=>{
        setNama(data.nama)
        setTelepon(data.telepon)
        setAlamat(data.alamat || "")
        setRating(data.rating || 0)
        setUrlPhoto(data.urlPhoto || 'https://images.unsplash.com/photo-1460748491143-2a97bbf7e4a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')
      })
      .catch(err=>console.log(err))
    }
  }, [])

  const editProfile = (name, phoneNumber, address) => {
    setNama(name)
    setTelepon(phoneNumber)
    setAlamat(address)
    setShowEdit(false)
  }

  const cancelEditHandler = () => {
    setShowEdit(false)
  }

  const _clearStoredData = () => {
      setIsLogged(false)
      setNama("Yang Cukur")
      setTelepon("")
      setAlamat("Please login first..")
      setRating(0)
      setUrlPhoto('https://images.unsplash.com/photo-1460748491143-2a97bbf7e4a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

      AsyncStorage.removeItem("access_token")
        .then(()=>{
          return AsyncStorage.removeItem("transaction_data")
        })
        .then(()=>{
          return AsyncStorage.removeItem("id")
        })
        .then(()=>{
          return AsyncStorage.removeItem("role")
        })
        .then(()=>{
          navigation.navigate('Home', {screen:"CustomerHome"})
        })
        .catch(console.log)
  }

  const checkAccess_token = async () => {
    const access = await AsyncStorage.getItem("access_token");
    if (!access) {
      setIsLogged(false)
    } else {
      setIsLogged(true)
      setToken(access)
    }
  };

  return (
    <View style={styles.screen}>
      <Header title="Profile" />
      <EditProfile
        visible={showEdit}
        onEditProfile={editProfile}
        onCancel={cancelEditHandler}
        name={nama}
        phoneNumber={telepon}
        address={alamat}
      />

      <Card style={styles.profileContainer}>
        <Image
          onPress={() => setShowEdit(true)}
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
      {isLogged &&
      <>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => setShowEdit(true)}
        >
          <Text style={styles.buttonText}>EDIT</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => _clearStoredData()}
        >
          <Text style={styles.buttonTextOutline}>LOGOUT</Text>
        </TouchableOpacity>
      </>
      }
      {!isLogged &&
      <>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login',{
            screen: 'Login'
          })}
        >
          <Text style={styles.buttonText}>login</Text>
        </TouchableOpacity>
      </>
      }
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



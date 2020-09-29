import React, { useEffect, useState, useContext } from 'react'
import { Switch, ScrollView, FlatList,  Image, Alert, View, Text, Button, StyleSheet, TouchableOpacity, SafeAreaView, AsyncStorage } from 'react-native'
import { FontAwesome5, Fontisto, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios"
import OrderCards from "../../components/OrderCards";
import Carousel from '../../components/Carousel'
import Colors from '../../constants/colors'
import Card from '../../components/Card'
import SocketContext from "../../context/SocketContext";


const sample = [
  { name: "kang cukur 1", status: "completed", tanggal: "202020", rating: "4.5", customer: "kang cukur 1", info: "Service Rambut" },
  { name: "kang cukur 2", status: "canceled", tanggal: "212121", rating: "4.5", customer: "kang cukur 1", info: "Service Rambut" },
  { name: "kang cukur 3", status: "canceled", tanggal: "212121", rating: "4.5", customer: "kang cukur 1", info: "Service Rambut" },
  { name: "kang cukur 1", status: "completed", tanggal: "202020", rating: "4.5", customer: "kang cukur 1", info: "Service Rambut" }
]


const KangcukurHome = ({ navigation }) => {
  const [name, setName] = useState('')
  const [telepon, setTelepon] = useState('')
  const [status, setStatus] = useState(false)
  const [disabled, setDisabled] = useState(false);
  const [transaction, setTransaction] = useState([])
  const [id, setId] = useState('')


  useFocusEffect(() => {
    let token
    if (!name) {
      AsyncStorage.getItem('id')
        .then(access_id => {
          setId(access_id)
          return AsyncStorage.getItem('access_token')
        })
        .then(access_token => {
          token = access_token
          return axios({
            url: `http://tukangcukur.herokuapp.com/tukangcukur/${id}`,
            method: 'GET',
            header: {
              access_token
            }
          })
        })
        .then(({data}) => {
          setName(data.nama)
          setTelepon(data.telepon)
          setStatus(data.status)
          return axios({
            url: 'http://tukangcukur.herokuapp.com/transaksi',
            method: 'GET',
            headers: {
              access_token: token
            }
          })
        })
        .then(({data})=>{
          setTransaction(data)
        })
        .catch(console.log)
    }

    },[])


    const toggleStatus = () => {
      setDisabled(true)
      AsyncStorage.getItem('access_token')
        .then(access_token => {
          return axios({
            url: 'https://tukangcukur.herokuapp.com/tukangcukur/'+id,
            method: "PATCH",
            headers:{
              access_token
            },
            data: {
              status: !status
            }
          })
        })
        .then(({data}) => {
          setStatus(data.status)
        })
        .catch(console.log)
        .finally(()=>{setDisabled(false)})
    }


  return (
    <View style={StyleSheet.screen}>
      <View style={styles.header}>
        <View style={styles.header1}>
          <View style={styles.profile}>
            <Image style={styles.fotoProfile}
              source={{
                uri:
                  "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
              }}
            />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.textHeader2}>Hi, {name}</Text>
            <Text style={styles.textHeader1}>{status ? 'Ready To Work' : 'Offline'}</Text>

          </View>
        </View>
        <View style={styles.header2}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={status ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>toggleStatus()}
            value={status}
            disabled={disabled}
          />
        </View>
      </View>
        <SafeAreaView>
        <View style={styles.carouselContainer}>
        <Image style={{width: '100%', height: 250}}
              source={{
                uri:
                  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80",
              }}
            />
        </View>
        <View style={styles.groupTitle}>

          <Text style={styles.textTitle}>History</Text>

        </View>
      </SafeAreaView>
      <ScrollView>
        {/* {transaction.filter(el=>{return el.TukangCukurId === +id}).map((el,i)=>{
          return <OrderCards item={el} key={i} />;
        })} */}

        {/* {sample.map((el,i)=>{
          return <OrderCards item={el} key={i} />;
        })} */}
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  textHeader2: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  textHeader1: {
    fontSize: 14,
    color: '#d2d2d2'
  },
  headerText: {
    justifyContent: 'flex-start',
    marginLeft: 20,
    paddingTop: 5

  },
  profile: {
    borderRadius: 50,
    width: 60,
    height: 60,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',

  },
  fotoProfile: {
    width: '100%',
    height: '100%',


  },

  header1: {
    flexDirection: 'row'
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.accent,
    height: 120,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  screen: {
    flex: 1,
  },
  groupTitle: {
    paddingTop: 10,
    paddingLeft: 20,
    flexDirection: "row",
    marginBottom:20
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 24
  },
  carouselContainer: {
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    // backgroundColor: Colors.accent
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 10,
    width: 80
  },
  card: {
    width: 250,
    backgroundColor: Colors.accent,
    margin: 10
  },
  btnGroup: {
    marginTop: 10,
    borderColor: Colors.accent,
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    width: 160,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  iconText: {
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listContainer: {
    marginTop: 20
  }
})

export default KangcukurHome
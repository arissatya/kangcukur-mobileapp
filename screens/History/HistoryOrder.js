import { StatusBar } from "expo-status-bar";
import React, {useState, useCallback} from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text,
  AsyncStorage
} from "react-native";
import HistoryCard from "../../components/HistoryCard"
import Header from "../../components/Header";
import Colors from "../../constants/colors";
import axios from "axios"

export default function HistoryOrder({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [completed, setCompleted] = useState(true)
  const [historyList, setHistoryList] = useState([])
  const [role, setRole] = useState('')
  const [id, setId] = useState(0)

  useFocusEffect(() => {
    getHistory()
  },[])

  const getHistory = useCallback(async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const role = await AsyncStorage.getItem("role");
    const stringId = await AsyncStorage.getItem("id")
    if(access_token){
      setRole(role)
      setId(+stringId)
      axios({
        url:"https://tukangcukur.herokuapp.com/transaksi",
        method: "GET",
        headers:{
          access_token
        }
      })
      .then(({data}) => {
        setHistoryList(data)
      })
      .catch(console.log)
    }else {
      navigation.navigate("Profile", {
        screen: "Login"
      })
    }
  })


  let dataCompleted = historyList.filter((e) => {
    return e.status === 'completed'
  }).filter(el=>{
    if(role === 'customer'){
      return el.CustomerId === id
    } else return el.TukangCukurId === id
  })
  let dataCanceled = historyList.filter((e) => {
    return e.status === 'cancelled'
  }).filter(el=>{
    if(role === 'customer'){
      return el.CustomerId === id
    } else return el.TukangCukurId === id
  })

  const canceledHandler = () => {
    setCompleted(false)
  }

  const completedHandler = () => {
    setCompleted(true)
  }


  // if(!historyList){
  //   return <ActivityIndicator
  //   size="large"
  //   color={Colors.accent}
  //   style={{flex:1, alignItems:"center", alignSelf:"center",alignContent:"center"}}
  // />
  // // return <Text style={{flex:1, fontSize:150}}>login dulu</Text>
  // }
  if(!historyList){
    return <ActivityIndicator
      size="large"
      color={Colors.accent}
      style={{flex:1, alignItems:"center", alignSelf:"center",alignContent:"center"}}
    />
  }

  return (
    <View style={styles.container}>
      <Header style={{flex:1}} title="Order History" />
      <View style={styles.btnHeaderContainer}>
        <TouchableOpacity
          style={completed ? styles.button : styles.buttonOutline}
          onPress={() => completedHandler()}
        >
          <Text style={completed ? styles.buttonText : styles.buttonTextOutline}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={completed ? styles.buttonOutline : styles.button}
          onPress={() => canceledHandler()}
        >
          <Text style={completed ?  styles.buttonTextOutline : styles.buttonText}>Canceled</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>

        <FlatList
          data={completed? dataCompleted : dataCanceled}
          renderItem={({ item, index }) => {
            return <HistoryCard item={item} role={role} index={index}/>;
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  button: {
    width: '50%',
    borderBottomWidth: 6,

    borderColor: Colors.accent,
    alignItems: "center",
    // backgroundColor: Colors.accent,
    padding: 10,
    // width: 120,
    // borderRadius: 20,
    // elevation: 8,
    // marginHorizontal:15
  },
  buttonOutline: {
    width: '50%',
    borderBottomWidth: 6,
    borderColor:Colors.base1,

    alignItems: "center",
    paddingVertical: 10,
    // width: 120,
    // borderRadius: 20,
    // marginTop: 0,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.accent,
  },
  buttonTextOutline: {
    color: Colors.color1,

    // fontWeight: 'bold',

    fontSize: 18
  },
  listContainer: {
    width: '90%',
    // justifyContent: "center",
    // alignItems: "center",
    alignContent: "center"
  }
});

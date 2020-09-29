import { StatusBar } from "expo-status-bar";
import React, { useEffect, createContext } from "react";
import { StyleSheet, Text, View, ToastAndroid, AsyncStorage, Alert} from "react-native";
import {NavigationContainer, useFocusEffect} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "react-native-vector-icons";
import * as Permissions from "expo-permissions";
import socketIOClient from 'socket.io-client'
import SocketContext from './context/SocketContext'
import axios from 'axios'

import { HomeStackNavigator } from "./navigation/HomeStackNavigator";
import {ProfileStackNavigator} from "./navigation/ProfileStackNavigator";
import {OrderStackNavigator} from "./navigation/OrderStackNavigator";
import HistoryOrder from "./screens/History/HistoryOrder";
import OngoingOrder from "./screens/Order/OngoingOrder";

import CompleteTransaction from './components/CompleteTransaction'
import ChatOrder from './screens/Order/ChatOrder'

const Tab = createBottomTabNavigator();

export default function App() {
  const socket = socketIOClient('https://tukangcukur.herokuapp.com')

  useEffect(() => {
    getLocationPermission();
  }, []);


  socket.on('endTransaction', (payload) => {
    let id
    AsyncStorage.getItem('id')
      .then((data) => {
        id = +data
        return AsyncStorage.getItem('role')
      })
      .then(role => {
        if (role && id) {
          if (role === 'customer') {
            if (id === payload.CustomerId) {
              Alert.alert(`transaction ${payload.status}`);
            }
          } if (role === 'tukangcukur') {
            if (id === payload.TukangCukurId) {
              Alert.alert(`transaction ${payload.status}`);
            }
          }
        }
      })
        .catch(console.log)
  }
)

// socket.emit('startTransactionServer', {CustomerId: data.CustomerId, TukangCukurId: data.TukangCukurId, status: data.status})

socket.on('startTransaction', (payload)=> {
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
  // let id
  //   AsyncStorage.getItem('id')
  //     .then((data) => {
  //       id = +data
  //       return AsyncStorage.getItem('role')
  //     })
  //     .then(role => {
  //       if (role && id) {
  //         if (role === 'customer') {
  //           if (id === payload.CustomerId) {
  //             console.log('customer emit <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
  //             Alert.alert(`transaction ${payload.status} created` );
  //           }
  //         } if (role === 'tukangcukur') {
  //           if (id === payload.TukangCukurId) {
  //             console.log('tukangcukur emit <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
  //             Alert.alert(`transaction ${payload.status} created`);
  //           }
  //         }
  //       }
  //     })
  //       .catch(console.log)
})



const getLocationPermission = async () => {
  const {
    status
  } = await Permissions.getAsync(Permissions.LOCATION);
  // console.log(status, "status");
  if (status !== "granted") {
    const response = await Permissions.askAsync(Permissions.LOCATION);
    // console.log(response, "respone");
  }
};

return (
  <SocketContext.Provider value = {socket}>
    <NavigationContainer>
      <Tab.Navigator screenOptions = {({route}) => ({
        tabBarIcon: ({
          focused,
          color,
          size
        }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "md-home";
          } else if (route.name === "Order") {
            iconName = "md-list";
          } else if (route.name === "History") {
            iconName = "md-time";
          } else if (route.name === "Profile") {
            iconName = "md-contact";
          } else if (route.name === "ChatOrder") {
            iconName = "md-chatbubbles";
          }

          return <Ionicons name = {iconName} size = {size} color = {color}
          />;
        },
      })
      } >
        <Tab.Screen name = "Home" component = {HomeStackNavigator}/>
        <Tab.Screen name = "Order" component = {OrderStackNavigator}/>
        <Tab.Screen name ="ChatOrder" component = {ChatOrder} />
        <Tab.Screen name = "History" component = {HistoryOrder}/>
        <Tab.Screen name = "Profile" component = {ProfileStackNavigator}/>
      </Tab.Navigator>
    </NavigationContainer>
  </SocketContext.Provider>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
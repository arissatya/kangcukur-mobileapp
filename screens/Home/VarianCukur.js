import React, { useState, useCallback, useEffect, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  ToastAndroid,
} from "react-native";
import { useDispatch } from "react-redux";
import { FontAwesome } from "react-native-vector-icons";
import axios from "axios";
import Colors from "../../constants/colors";
import VarianList from "../../components/VarianList";
import SocketContext from "../../context/SocketContext";


export default function VarianCukur({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [servis, setServis] = useState([]);
  const [customerLatitude, setCustomerLatitude] = useState(0);
  const [customerLongitude, setCustomerLongitude] = useState(0);
  const [varian, setVarian] = useState([])

  const socket = useContext(SocketContext)

  useEffect(() => {
    const geoInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          if (latitude) {
            setCustomerLatitude(latitude);
          }
          if (longitude) {
            setCustomerLongitude(longitude);
          }
        },
        (error) => console.log("error getCurr:", error)
      );
    }, 3000);
    return () => {
      clearInterval(geoInterval);
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      color: Colors.color1,
      backgroundColor: Colors.base2
    },
    form: {
      flex: 4,
      flexDirection: "column",
      marginTop: 20,
      width: windowWidth,
      height: windowHeight,
      alignItems: "center",
      justifyContent: "center",
      padding: 3,
    },
  });

  useFocusEffect(() => {
    if(varian.length < 1 ){
      getVarian()
    }
  },[])

  const getVarian = useCallback(async () => {
    const access_token = await AsyncStorage.getItem("access_token");

    axios({
      url:"https://tukangcukur.herokuapp.com/varian",
      method: "GET",
      headers:{
        access_token
      }
    })
    .then(({data}) => {
      setVarian(data)
    })
    .catch(console.log)
  })

  const addServis = (item) => {
    if (
      servis.filter((el) => {
        return el.jenisCukur === item.jenisCukur;
      }).length
    ) {
      const addSameService = [...servis].map((el) => {
        if (el.jenisCukur === item.jenisCukur) {
          el.jumlah++;
        }
        return el;
      });
      setServis(addSameService);
    } else {
      setServis([...servis].concat({ ...item, jumlah: 1 }));
    }
  };

  const reduceServis = (item) => {
    let removeSameService;
    if (
      servis.filter((el) => {
        return el.jenisCukur === item.jenisCukur;
      }).length
    ) {
      removeSameService = [...servis].map((el) => {
        if (el.jenisCukur === item.jenisCukur) {
          el.jumlah--;
        }
        return el;
      });
    }
    const removeService = removeSameService.filter((el) => {
      return el.jumlah !== 0;
    });
    setServis(removeService);
  };

  const postCukurNow = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (!customerLatitude || !customerLongitude || !servis.length) {
      ToastAndroid.show("Please pick a service.. ", 3000);
    }
    else if (!customerLatitude || !customerLongitude) {
      ToastAndroid.show("Location not acquired.. ", 3000);
    } else {
      axios({
        url: "https://tukangcukur.herokuapp.com/transaksi",
        method: "POST",
        headers: {
          access_token,
        },
        data: {
          customerLatitude,
          customerLongitude,
          servis,
        },
      })
        .then(async ({ data }) => {
          socket.emit('startTransactionServer', {CustomerId: data.CustomerId, TukangCukurId: data.TukangCukurId, status: data.status})
          try {
            await AsyncStorage.setItem(
              "transaction_data",
              JSON.stringify(data)
            );
            navigation.navigate("Order", {
              screen: "OngoingOrder",
            });
          } catch (err) {
            return
          }
        })
        .catch((err) => {
          ToastAndroid.show("We cant find kangcukur yet...", 3000);
        });
    }
  };
  if(!varian.length || !customerLatitude || !customerLongitude){
    return <ActivityIndicator
      size="large"
      color={Colors.accent}
      style={{flex:1, alignItems:"center", alignSelf:"center",alignContent:"center"}}
    />
  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* <Text>{JSON.stringify(customerLatitude)} - {JSON.stringify(customerLongitude)}</Text> */}
        <View
          style={{
            // backgroundColor: Colors.accent,
            alignSelf: "flex-start",
            paddingHorizontal: 15,
            paddingVertical: 40,
            width: "100%",
            marginTop:10,
            flex: 5,
          }}
        >
          <View style={{justifyContent:"center", alignContent:"center", alignItems:"center", backgroundColor:Colors.accent, borderRadius:10, width:"100%", elevation:8}}>
          <Text style={{ fontSize: 28, color: Colors.base1}}>
            VARIAN CUKUR
          </Text>
          </View>
          <FlatList
            data={varian}
            renderItem={({ item, index }) => {
              return (
                <VarianList
                  item={item}
                  addCukurVarian={addServis}
                  reduceCukurVarian={reduceServis}
                />
              );
            }}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
        <TouchableOpacity
          style={{
            marginBottom:20,
            backgroundColor: Colors.color1,
            width: (windowWidth * 70) / 100,
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 50,
            elevation: 8,
          }}
          onPress={() => postCukurNow()}
        >
          <Text style={{ color: Colors.base1, fontSize: 30 }}>CUKUR NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

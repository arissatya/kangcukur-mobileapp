import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from "react-native";
import SocketContext from "../../context/SocketContext";
import axios from "axios";
import { Fontisto } from "@expo/vector-icons";
import Header from "../../components/Header";
import Colors from "../../constants/colors";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default function OngoingOrder({ navigation }) {
  const socket = useContext(SocketContext)

  //PLEASE INSERT THIS FUNCTION ON A BUTTON
  const endTransaction = async (status) => {
    const access_token = await AsyncStorage.getItem("access_token");
    const stringedData = await AsyncStorage.getItem("transaction_data");
    const parsedData = JSON.parse(stringedData);
    // console.log(access_token)
    if (!parsedData) ToastAndroid.show("Order not exist", 3000);
    else {
      axios({
        url: `https://tukangcukur.herokuapp.com/transaksi/${parsedData.id}`,
        method: "PATCH",
        headers: {
          access_token,
        },
        data: {
          status,
        },
      })
        .then(({data}) => {
          setTransaction({
            CustomerId: 0,
            TukangCukurId: 0,
            status: "",
            Customer: {
              nama: "",
              alamat: "",
              telepon: "",
            },
            TukangCukur: {
              nama: "",
              telepon: "",
              urlPhoto:
                "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
              rating: 0,
              latitude: 0,
              longitude: 0,
            },
            TransactionDetails: [],
          })
          socket.emit('endTransactionServer', {CustomerId: data.CustomerId, TukangCukurId: data.TukangCukurId, status: data.status})
          return AsyncStorage.removeItem("transaction_data");
        })
        .then(()=>{
          navigation.navigate("Home")
        })
        .catch(console.log);
    }
  };
  //PLEASE INSERT THIS FUNCTION ON A BUTTON

  const [transaction, setTransaction] = useState({
    CustomerId: 0,
    TukangCukurId: 0,
    status: "",
    Customer: {
      nama: "",
      alamat: "",
      telepon: "",
    },
    TukangCukur: {
      nama: "",
      telepon: "",
      urlPhoto:
        "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      rating: 0,
      latitude: 0,
      longitude: 0,
    },
    TransactionDetails: [],
  });
  const [cusLat, setCusLat] = useState(-7.563967);
  const [cusLong, setCusLong] = useState(110.854295);
  const [kangLat, setKangLat] = useState(-7.563967);
  const [kangLong, setKangLong] = useState(110.854295);
  const [kangCuk, setKangCuk] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkTransaction_data = useCallback(async () => {
    setLoading(true);
    const access_token = await AsyncStorage.getItem("access_token");
    const data = await AsyncStorage.getItem("transaction_data");

    if (!access_token && !data) navigation.navigate("Profile", {
      screen: "Login"
    })

    if (data) {
      const transac = JSON.parse(data);
      setTransaction(transac);

      setKangLat(transac.TukangCukur.latitude);
      setKangLong(transac.TukangCukur.longitude);

      setCusLat(transac.customerLatitude);
      setCusLong(transac.customerLongitude);

      setKangCuk([
        transac.TukangCukur,
        {
          latitude: transac.customerLatitude,
          longitude: transac.customerLongitude,
          id: transac.TukangCukur.id + 50,
          nama: transac.Customer.nama,
        },
      ]);
      setLoading(false)
    } else {
      axios({
        url: "http://tukangcukur.herokuapp.com/transaksi/ongoing",
        method: "GET",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          if (!data) {
            setLoading(false)
            navigation.navigate("NoOrder", {
              screen: "NoOrder",
            });
          }
          else {
            setKangLat(data.TukangCukur.latitude);
            setKangLong(data.TukangCukur.longitude);

            setCusLat(data.customerLatitude);
            setCusLong(data.customerLongitude);

            setTransaction(data);

            setKangCuk([
              data.TukangCukur,
              {
                latitude: data.customerLatitude,
                longitude: data.customerLongitude,
                id: data.TukangCukur.id + 50,
                nama: data.Customer.nama,
              },
            ]);
          }
          if (data) return AsyncStorage.setItem("transaction_data", JSON.stringify(data))
        })
        .then(()=>{console.log()})
        .catch(console.log)
        .finally(() => {
          setLoading(false);
        });
    }
  });

  useFocusEffect(() => {
    if (!transaction.id) {
      checkTransaction_data();
    }
  }, []);

  const mapRef = useRef();

  useFocusEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.fitToSuppliedMarkers(
          kangCuk.map(({ id }) => {
            return String(id);
          })
        );
      }, 3000);
    }
  }, []);

  const chatTransaction = () => {
    navigation.navigate("ChatOrder", {
      screen: "ChatOrder",
    });
  }

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.accent}
        style={{
          flex: 1,
          alignItems: "center",
          alignSelf: "center",
          alignContent: "center",
        }}
      />
    );
  } else {
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <Header title="Maps" />
        <MapView
          ref={mapRef}
          showsUserLocation={true}
          showsMyLocationButton={false}
          loadingEnabled
          style={{ flex: 1 }}
          initialRegion={{
            latitude: cusLat,
            longitude: cusLong,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* <Marker
            coordinate={{ latitude: kangLat, longitude: kangLong }}
            pinColor={"green"}
          /> */}
          {kangCuk.map((marker) => (
            <Marker
              key={marker.id}
              identifier={String(marker.id)}
              pinColor={"green"}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.nama}
            />
          ))}
        </MapView>
        <View style={styles.mapsText}>
          {!transaction.id && <ActivityIndicator />}
          {transaction.id && (
            <>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={styles.cardContainer}>
                  <View style={styles.card}>
                    <View style={styles.cardContainer}>
                      <Image
                        style={styles.fotoProfile}
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1520338661084-680395057c93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
                        }}
                      />
                      <View style={styles.text}>
                        <Text style={styles.title}>
                          {transaction.TukangCukur.nama}
                        </Text>
                        <Text style={styles.info}>
                          {transaction.TukangCukur.telepon}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginLeft: 20,
                          flexDirection: "row",
                          alignContent: "center",
                        }}
                      >
                        <Text style={styles.textLink}>
                          <Fontisto
                            name="star"
                            size={18}
                            color={Colors.cancelButton}
                          />
                          {String(transaction.TukangCukur.rating).length === 1
                            ? String(transaction.TukangCukur.rating) + ".0"
                            : transaction.TukangCukur.rating.toFixed(1)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 10, justifyContent:"space-between" }}>

              <TouchableOpacity
                  style={[styles.button, {width: '20%', backgroundColor:'#c0392b'}]}
                  onPress={() => endTransaction('cancelled')}
                >
                  {/* <Text style={styles.buttonText}>CANCEL</Text> */}
                  <Fontisto name="close-a" size={15} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, {width: '15%'}]}
                  onPress={() => chatTransaction('chat')}
                >
                  <Fontisto name="comments" size={15} color="white" />
                  {/* <Text style={styles.buttonText}>CHAT</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#27ae60'}]}
                  onPress={() => endTransaction('completed')}
                >
                  {/* <Text style={[styles.buttonText,{fontSize: 14}]}>COMPLETE ORDER</Text> */}
                  <Fontisto name="check" size={15} color="white" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapsText: {
    flex: 1,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    padding: 10,
    color: Colors.color1,
    width: width * 0.95,
    alignSelf: "center",
    height: height * 0.2,
    position: "absolute",
    bottom: height * 0.02,
  },
  fotoProfile: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  textLink: {
    fontWeight: "bold",
    color: Colors.accent,
    fontSize: 25,
  },
  fotoProfile: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.base1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  card: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  info: {
    fontSize: 13,
  },
  rating: {
    fontSize: 18,
    marginLeft: 10,
  },
  ratingContainer: {
    marginTop: 5,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.accent,
    padding: 10,
    width: "50%",
    borderRadius: 20,
    elevation: 8,
  },
  buttonOutline: {
    alignItems: "center",
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 12
  },
});

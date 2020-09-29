import React, { useState } from 'react';
import { StyleSheet, View, Text,Image, Input, Button, TouchableOpacity } from 'react-native'
import Colors from '../../constants/colors.js'
import Header from '../../components/Header'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';

import ChatCard from '../../components/ChatCard'

export default function ChatOrder({ navigation }) {
  const [text, setText] = useState('')
  const [message, setMessage] = useState([])

  // data yg dikirim: id, namaKangCUkur, namaCustomer, message, role[Customer Or TukangCukur]

  const messageData = [

    { id: 1, namaKangCUkur: "kang cukur 1", role: "Customer", message: "Hai", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 2", role: "TukangCukur", message: "Halo", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 1", role: "Customer", message: "Hai", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 2", role: "TukangCukur", message: "Halo", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 3", role: "TukangCukur", message: "Hai Juga", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 3", role: "TukangCukur", message: "Hai Juga", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 1", role: "Customer", message: "Hai", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 2", role: "TukangCukur", message: "Halo", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 3", role: "TukangCukur", message: "Hai Juga", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 1", role: "Customer", message: "Hai", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 2", role: "TukangCukur", message: "Halo", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 3", role: "TukangCukur", message: "Hai Juga", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 1", role: "Customer", message: "Hai", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 2", role: "TukangCukur", message: "Halo", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 3", role: "TukangCukur", message: "Hai Juga", namaCustomer: "kang cukur 1" },
    { id: 1, namaKangCUkur: "kang cukur 1", role: "Customer", message: "Hai", customer: "kang cukur 1" },
  ]

  const onSend = () => {
    // tinggal di masukin aja ke data list nya
  }

  return (
    <View style={styles.container}>
    {messageData[1].role === 'Customer' ? (
      <Header title={"Messages From : "+messageData[1].namaCustomer} />

    ) : (
      <Header title={"Messages From Kang : "+messageData[1].namaKangCUkur} />
    )}

      <ScrollView style={styles.chat}>
        <FlatList
          data={messageData}
          renderItem={({ item, index }) => {
            return <ChatCard message={item.message} status={item.status} index={index} />;
          }}
          keyExtractor={(item, index) => `${index}`}
        />

      </ScrollView>
      <View style={styles.buttomContainer}>
        <View styles={styles.inputContainer}>
          <View style={styles.buttomIcon}>

          </View>
          <View style={styles.buttonInput}>
            <TextInput
              style={styles.input}
              onChangeText={text => setMessage(text)}
              value={message}
              placeholder="Type Here ..."
            />
          </View>

        </View>
        <View style={styles.send}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSend()}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  chat: {
    width: '100%',
    marginBottom: 60,
    padding:10
  },
  input: {
    width:240,
  },
  inputContainer: {
    alignItems: 'center',
  },
  buttonInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width:'100%'
  },
  button: {
    backgroundColor: Colors.accent,
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
  },
  buttonText: {
    fontWeight: 'bold',
    color:'white',
  },
  buttomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: 'absolute',
    marginBottom: 0,
    bottom: 0,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Colors.base1,
    alignItems: "center",
    color: Colors.color1,
    backgroundColor: Colors.base2,
  },
});

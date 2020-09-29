import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Modal, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Colors from '../constants/colors';
import Card from './Card'

const GoalInput = props => {
  const [name, setName] = useState(props.name)
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber)
  const [address, setAddress] = useState(props.address)

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const editProfileHandler = () => {
    props.onEditProfile(name, phoneNumber, address)
  }

  return (
    
    <Modal visible={props.visible} animationType="slide">
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View style={styles.container}>
          <Card style={styles.formContainer}>
            <Image
              style={styles.fotoProfile}
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
              }}
            />
            <Text style={styles.title}>NAMA</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setName(text)}
              value={name}
              placeholder={props.name}
            />
            <Text style={styles.title}>PHONE NUMBER</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
              placeholder={props.phoneNumber}

            />
            <Text style={styles.title}>ADDRESS</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setAddress(text)}
              value={address}
              placeholder={props.address}

            />
          </Card>
          <TouchableOpacity
            style={styles.button}
            onPress={editProfileHandler}
          >
            <Text style={styles.buttonText}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={props.onCancel}
          >
            <Text style={styles.buttonTextOutline} >CANCEL</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  fotoProfile: {
    borderColor: 'black',
    borderRadius: 70,
    width: 120,
    height: 120,
    marginTop: -90,
  },
  input: {
    height: 40,
    borderBottomColor: Colors.accent,
    borderBottomWidth: 2,
    textAlign: 'center',
    width: 300,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.accent,
    padding: 10,
    width: '80%',
    borderRadius: 20,
    elevation: 8
  },
  buttonText: {
    color: 'white'
  },
  buttonTextoutline: {
    color: Colors.accent
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
})

export default GoalInput
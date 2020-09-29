import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/colors';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.accent,
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  headerTitle: {
    fontSize: 22,
    color: Colors.base1,
    fontWeight: 'bold'

  }
})

export default Header

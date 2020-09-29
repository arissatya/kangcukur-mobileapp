import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import KangcukurHome from "../screens/Home/KangcukurHome";
import CustomerHome from "../screens/Home/CustomerHome";
import VarianCukur from "../screens/Home/VarianCukur";
import OrderNotification from "../screens/Home/OrderNotification"

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerHome"
        component={CustomerHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="KangcukurHome"
        component={KangcukurHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VarianCukur"
        component={VarianCukur}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
      name="OrderNotification"
      component={OrderNotification}
      options={{
        headerShown: false,
      }}
    /> */}
    </Stack.Navigator>
  );
};

export { HomeStackNavigator };

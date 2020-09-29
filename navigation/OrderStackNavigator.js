import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import OngoingOrder from "../screens/Order/OngoingOrder"
import NoOrder from "../screens/Order/NoOrder"
import Rating from "../screens/Order/Rating"
import ChatOrder from "../screens/Order/ChatOrder"

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen
      name="OngoingOrder"
      component={OngoingOrder}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="NoOrder"
      component={NoOrder}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Rating"
      component={Rating}
      options={{
        headerShown: false,
      }}
    />
    {/* <Stack.Screen
      name="ChatOrder"
      component={ChatOrder}
      options={{
        headerShown: false,
      }}
    /> */}
  </Stack.Navigator>
  )
}

export { OrderStackNavigator };

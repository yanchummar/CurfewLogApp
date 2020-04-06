import 'react-native-gesture-handler'
import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import { Home, NewRequest, RequestView } from './src/screens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen
          name="Home"
          component={Home} />
        <Stack.Screen 
          name="New Request" 
          component={NewRequest} />
        <Stack.Screen 
          name="Request View" 
          component={RequestView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
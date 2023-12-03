import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './components/Home'
import Detail from './components/Detail'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
        name='Home'
        component={Home}
        />
        <Stack.Screen name='Detail' component={Detail} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>

    // <View>
    //   <Text>Hello Baby</Text>
    //   <Text>Hello Baby</Text>
    //   <Text>Hello Baby</Text>
    //   <Text>Hello Baby</Text>
    // </View>
  )
}

export default App

const styles = StyleSheet.create({
})
import { Alert, Button, ImageBackground, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {React, useLayoutEffect, useState, useEffect} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import auth, { firebase } from '@react-native-firebase/auth'

import LogOut from 'react-native-vector-icons/AntDesign'

const Login = ({navigation}) => {

    let [email, setEmail] = useState()
    let [pass, setPass] = useState()
    let [authen, setAuthen] = useState(false)
    let [userData, setUserData] = useState()

    useEffect(()=>{
        let user = firebase.auth().currentUser;
        if(user){
            setAuthen(true)
            setUserData(user)
        }else{
            setAuthen(false)
        }
        console.log(user)
    }, [authen])

    const loginFunc = async ()=> {
        if(!email || !pass){
            Alert.alert('email & password must be filled')
            return
        }

        try{
            let response = await auth().signInWithEmailAndPassword(email, pass)
            if(response){
                setAuthen(true)
            }
            console.log(response)
        }catch(e){
            console.log('got error: ', e.message)
            Alert.alert(e.message)
        }
    }

    const logOutFunc = ()=>{
        console.log('logout')
        if(authen){
            auth()
                .signOut()
                .then(() => {
                    console.log('User signed out!')
                    setAuthen(false)
                });
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Login",
            headerTransparent: true,
            headerTintColor: '#38B6FF',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25
            },
            headerRight: 
            authen ?
            () => (
                <TouchableOpacity
                style={styles.logOutDiv}
                onPress={logOutFunc}
                >
                    <Text style={styles.logOutText}>Log Out</Text>
                    <LogOut
                        name='logout'
                        size={18}
                        color="white"
                    />
                </TouchableOpacity>
            )
            : null
        })
    })

  return (
      <ImageBackground source={require('../assets/bg.png')} style={styles.bgImage}>
            {
                authen
                ?
                  <View style={styles.boxDiv}>
                        <Text style={{color: 'white', fontSize: 25}}>Welcome To ThingSeeSmart</Text>
                        <View style={styles.loggedInDiv}>
                          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{userData.displayName}</Text>
                          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{userData.email}</Text>
                        </View>
                    </View>
                :
                    <View style={styles.boxDiv}>
                        <TextInput
                            onChangeText={txt => setEmail(txt)}
                            value={email}
                            placeholder='Enter Email'
                            placeholderTextColor={'white'}
                            style={styles.inputBox}
                            textContentType='emailAddress'
                            keyboardType='email-address'
                        />
                        <TextInput
                            onChangeText={txt => setPass(txt)}
                            value={pass}
                            placeholder='Enter Password'
                            placeholderTextColor={'white'}
                            style={styles.inputBox}
                            secureTextEntry={true}
                            textContentType='password'
                        />
                        <TouchableOpacity onPress={loginFunc} >
                            <LinearGradient
                                colors={['rgba(255,255,255,1)', '#a6a6a6']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                useAngle
                                angle={190}
                                style={styles.buttonStyle}
                                >
                                    <Text style={styles.loginStyle}>Login</Text>
                                </LinearGradient>
                        </TouchableOpacity>

                        {/* <TouchableOpacity>
                            <Text style={styles.forgotPassword}>Forgot Password</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                            <Text style={styles.registerButton}>Register</Text>
                        </TouchableOpacity>
                        
                    </View>
            }
      </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
    bgImage: {
        // width: "100%",
        // height: "100%",
        flex: 1,
    },
    boxDiv: {
        // marginTop: 100,
        flex: 1,
        // flexDirection: 'row',
        // padding: 8,
        gap: 20,
        alignItems: "center",
        justifyContent: 'center',
        // flexWrap: 'wrap',
    },
    textStyle : {
        color: 'white',
        // fontSize: 25,
        // fontWeight: 'bold'
    },
    inputBox: {
        width: "90%",
        borderWidth: 1,
        borderRadius: 25,
        borderColor: 'white',
        paddingHorizontal: 25,
        paddingVertical: 18,
        color: 'white'
    },
    buttonStyle:{
        width: 150,
        // borderWidth: 1,
        borderRadius: 25,
        // borderColor: 'white',
        paddingHorizontal: 25,
        paddingVertical: 18,
        // backgroundColor: '#a6a6a6',
        textAlign: 'center',
        alignItems: 'center',
    },
    loginStyle:{
        color: '#00A3FF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    forgotPassword: {
        color: 'white',
        alignSelf: 'flex-start',
        textDecorationLine: 'underline'
    },
    registerButton:{
        textDecorationLine: 'underline',
        color: 'white',
    },
    logOutDiv:{
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#38B6FF',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 25
    },
    logOutText:{
        color: 'white',
        fontSize: 15,
        // fontWeight: 'bold'
    },
    loggedInDiv:{
        color: 'white',
        gap: 10
    }
})
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { React, useLayoutEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import auth from '@react-native-firebase/auth';

const Register = ({ navigation }) => {

    let [name, setName] = useState()
    let [email, setEmail] = useState()
    let [pass, setPass] = useState()

    const registerUser = async()=>{
        console.log('hello')
        console.log(name)
        if(name){
            console.log('yes')
        }
        if(!name || !email || !pass){
            Alert.alert("Fill all the boxes.")
            return
        }
        auth()
            .createUserWithEmailAndPassword(email, pass)
            .then((usr) => {
                usr.user.updateProfile({
                    displayName: name
                }).then(()=>{
                    navigation.navigate('Home')
                    console.log('User account created & signed in!');
                })
            })
            .catch(error => {
                // if (error.code === 'auth/email-already-in-use') {
                //     console.log('That email address is already in use!');
                // }

                // if (error.code === 'auth/invalid-email') {
                //     console.log('That email address is invalid!');
                // }

                // console.error(error);
                Alert.alert("error is: ", error.message)
            });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Register",
            headerTransparent: true,
            headerTintColor: '#38B6FF',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25
            },
        })
    })

    return (
        <ImageBackground source={require('../assets/bg.png')} style={styles.bgImage}>
            <View style={styles.boxDiv}>
                <TextInput
                    onChangeText={txt => setName(txt)}
                    value={name}
                    placeholder='User Name'
                    placeholderTextColor={'white'}
                    style={styles.inputBox}
                />
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
                    secureTextEntry
                    textContentType='password'
                />
                <TouchableOpacity onPress={registerUser}>
                    <LinearGradient
                        colors={['rgba(255,255,255,1)', '#a6a6a6']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        useAngle
                        angle={190}
                        style={styles.buttonStyle}
                    >
                        <Text style={styles.loginStyle}>Register</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginButton}>Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Register

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
    textStyle: {
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
    buttonStyle: {
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
    loginStyle: {
        color: '#00A3FF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    loginButton: {
        textDecorationLine: 'underline',
        color: 'white',
        fontSize: 18
    }
})
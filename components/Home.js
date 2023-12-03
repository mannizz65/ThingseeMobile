import { ImageBackground, StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native'
import {React, useLayoutEffect, useEffect, useState} from 'react'
import TheeDotLine from 'react-native-vector-icons/Ionicons'
import Person from 'react-native-vector-icons/Ionicons'
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'
// import CircularProgress from 'react-native-circular-progress-indicator';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import CarbonIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Cloud from 'react-native-vector-icons/MaterialIcons'
import Droplet from 'react-native-vector-icons/Entypo'
import Temperature from 'react-native-vector-icons/FontAwesome5'
import Door from 'react-native-vector-icons/FontAwesome5'
import AirPressure from 'react-native-vector-icons/FontAwesome5'

import firestore from '@react-native-firebase/firestore';

import { format } from 'date-fns';

import LottieView from 'lottie-react-native'

const Home = ({navigation}) => {

    let [sensorData, setSensorData] = useState([])
    let [latestData, setLatestData] = useState([])

    let [loading, setLoding] = useState(false)

    let [dates, setDates] = useState([])

    let [carbonDioxide, setCarbonDioxide] = useState([])
    let [humidity, setHumidity] = useState([])
    let [airpressure, serAirPresuure] = useState([])
    let [tvoc, setTvoc] = useState([])
    let [temp, setTemp] = useState([])
    let [historicalIn, setHIstorcialIn] = useState([])
    let [historicalOut, setHIstorcialOut] = useState([])

    useEffect(()=>{
        getData()
    }, [])

    const getData = async()=>{
        // const data = await firestore().collection('data').limit(2).get();
        const snapData = await firestore().collection('data').orderBy('timestamp', 'desc').onSnapshot(onResult, onError);

        // console.log(snapData)

        // console.log(data.docs[0]._data)
        // console.log('here')
    }

    const onResult = (da =>{

        console.log('from top')
        console.log('total documents ' + da.docs.length)

        const latestTimestampsPerDay = new Map(); // Map to store the latest timestamp for each day
        const uniqueData = []; // To store unique data entries

        // set Latest Data
        setLatestData(da.docs[0]._data)

        let timesofsensor = [];
        let carbonDioxideData = [];
        let tvocData = [];
        let humidityData = [];
        let tempData = [];
        let airPresData = [];
        let histoInData = [];
        let histOutData = [];

        da.forEach(doc=>{
            const seconds = doc._data.timestamp._seconds;
            const milliseconds = seconds * 1000; // Convert to milliseconds
            const dateObject = new Date(milliseconds);

            const timestamp = doc.data().timestamp;
            const date = timestamp.toDate().toISOString().split('T')[0]; // Extract the date part

            if (!latestTimestampsPerDay.has(date) || timestamp.toDate() > latestTimestampsPerDay.get(date).toDate()) {
                // If it's a new day or a later timestamp for the same day, update the latest timestamp and add the data to the result
                latestTimestampsPerDay.set(date, timestamp);
                uniqueData.push(doc.data());

                timesofsensor.push(doc.data().timestamp)
                carbonDioxideData.push(doc.data().carbonDioxide)
                tvocData.push(doc.data().tvoc)
                humidityData.push(doc.data().humd)
                tempData.push(doc.data().temp)
                airPresData.push(doc.data().airp)
                histoInData.push(doc.data().historicalIn)
                histOutData.push(doc.data().historicalOut)
            }
            
        })

        setDates(timesofsensor)
        setCarbonDioxide(carbonDioxideData)
        setTvoc(tvocData)
        setHumidity(humidityData)
        setTemp(tempData)
        serAirPresuure(airPresData)
        setHIstorcialIn(histoInData)
        setHIstorcialOut(histOutData)


        console.log('from snapData')
        setSensorData(uniqueData)
        console.log('uniqueData Length ' + sensorData.length)

        setLoding(true)
    })
        
    const onError = (err=>{
        console.log('error '+err)
    })

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            title: "Dashboard",
            headerTransparent: true,
            headerTintColor: '#38B6FF',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25
            },
            headerTitleAlign: 'center',
            headerLeft: ()=>(
                <TheeDotLine
                    name="reorder-three-outline"
                    size={30}
                    color="#38B6FF"
                />
            ),
            headerRight: ()=>(
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Person
                        name="person"
                        size={30}
                        color="white"
                        borderRadius={0}
                    />
                </Pressable>
            )
        })
    })

    function setValue(val, minV, maxV){
        console.log('from setValue')

        let stateVariable;
        if (val === 'tvoc') {
            stateVariable = tvoc;
        } else if (val === 'humidity') {
            console.log('humidity ', humidity)
            stateVariable = humidity;
        } else if (val === 'carbonDioxide') {
            stateVariable = carbonDioxide;
        } else if (val === 'temperature') {
            console.log('temp ', temp)
            stateVariable = temp;
        } else if (val === 'airpressure') {
            console.log('airpressure ', airpressure)
            stateVariable = airpressure;
        }
        
        else if (val === 'historicalin') {
            console.log('historicalIn ', historicalIn)
            stateVariable = historicalIn;
        }
        
        else if (val === 'historicalout') {
            stateVariable = historicalOut;
        }

        if(stateVariable.length > 0){
            for (let index = 0; index < stateVariable.length; index++) {
                if (stateVariable[index] > 0){
                    let min = minV
                    let max = maxV

                    let percent = ((stateVariable[index] - min)/(max-min))*100
                    // console.log('percent ' + percent)
                    // console.log('stateVariable[index] ' + stateVariable[index])
                    return Math.round(percent)
                }
            }
        }else{
            return;
        }

    }

    function setValueInBox(val){
        let stateVariable;
        if (val === 'tvoc') {
            stateVariable = tvoc;
        } else if (val === 'humidity') {
            console.log('humidity ', humidity)
            stateVariable = humidity;
        } else if (val === 'carbonDioxide') {
            stateVariable = carbonDioxide;
        } else if (val === 'temperature') {
            console.log('temp ', temp)
            stateVariable = temp;
        } else if (val === 'airpressure') {
            console.log('airpressure ', airpressure)
            stateVariable = airpressure;
        }

        if (stateVariable.length > 0) {
            for (let index = 0; index < stateVariable.length; index++) {
                if (stateVariable[index] > 0) {
                    return Math.round(stateVariable[index])
                }
            }
        } else {
            return;
        }

        return 1600
    }

    function setInOutValue(val){
        let stateVariable;
        if (val === 'in') {
            stateVariable = historicalIn;
        } else if (val === 'out') {
            stateVariable = historicalOut;
        }

        // console.log('last date of in 0: ', dates[0].toDate())
        // console.log('last date of in 1: ', dates[1].toDate())
        
        return stateVariable[0]

        if (stateVariable.length > 0) {
            for (let index = 0; index < stateVariable.length; index++) {
                if (stateVariable[index] > 0) {
                    return Math.round(stateVariable[index])
                }
            }
        } else {
            return;
        }
    }

    const data = [
        {
            id: 1,
            name: "Carbon Dioxide",
            varName: 'carbonDioxide',
            value: setValue('carbonDioxide', 0, 2000),
            unit: 'ppm',
            condition: setValue('carbonDioxide', 0, 2000) > 0 && setValue('carbonDioxide', 0, 2000) < 33
            ? 'Bad'
            :
                setValue('carbonDioxide', 0, 2000) > 33 && setValue('carbonDioxide', 0, 2000) < 66
            ?
                'Average'
            :
                'Good'
            ,
            icon: <CarbonIcon
                name="molecule-co2"
                size={29}
                color="white" 
                />
        },
        {
            id: 2,
            name: "TVOC",
            varName: 'tvoc',
            value: setValue('tvoc', 500, 0),
            unit: 'µg/m³',
            condition: setValue('tvoc', 500, 0) > 0 && setValue('tvoc', 500, 0) < 33
                ? 'Bad'
                :
                setValue('tvoc', 500, 0) > 33 && setValue('tvoc', 500, 0) < 66
                    ?
                    'Average'
                    :
                    'Good'
            ,
            icon: <Cloud 
                name="air"
                size={29}
                color="white"
                style={{ transform: [{ rotate: '270deg'}]}}
                />
        },
        {
            id: 3,
            name: "Humidity",
            varName: 'humidity',
            value: setValue('humidity', 0, 100),
            unit: 'rh',
            condition: setValue('humidity', 0, 100) > 0 && setValue('humidity', 0, 100) < 33
                ? 'Bad'
                :
                setValue('humidity', 0, 100) > 33 && setValue('humidity', 0, 100) < 66
                    ?
                    'Average'
                    :
                    'Good'
            ,
            icon: <Droplet
                name="drop"
                size={29}
                color="white"
            />
        },
        {
            id: 4,
            name: "Temperature",
            varName: 'temperature',
            value: setValue('temperature', 0, 25),
            unit: '°C',
            condition: setValue('temperature', 0, 25) > 0 && setValue('temperature', 0, 25) < 33
                ? 'Bad'
                :
                setValue('temperature', 0, 25) > 33 && setValue('temperature', 0, 25) < 66
                    ?
                    'Average'
                    :
                    'Good'
            ,
            icon: <Temperature
                name="temperature-high"
                size={29}
                color="white"
            />
        },
        {
            id: 7,
            name: "Air Pressure",
            varName: 'airpressure',
            value: setValue('airpressure', 95000, 105000),
            unit: 'Pa',
            condition: setValue('airpressure', 95000, 105000) > 0 && setValue('airpressure', 95000, 105000) < 33
                ? 'Bad'
                :
                setValue('airpressure', 95000, 105000) > 33 && setValue('airpressure', 95000, 105000) < 66
                    ?
                    'Average'
                    :
                    'Good'
            ,
            icon: <AirPressure
                name="tachometer-alt"
                size={29}
                color="white"
            />
        },
        // {
        //     id: 5,
        //     name: "Historical In",
        //     varName: 'historicalin',
        //     value: setValue('historicalin', 1, 50),
        //     unit: 'abc',
        //     condition: 'Good',
        //     icon: <Door
        //         name="door-open"
        //         size={29}
        //         color="white"
        //     />
        // },
        // {
        //     id: 6,
        //     name: "Historical Out",
        //     varName: 'historicalout',
        //     value: setValue('historicalin', 1, 50),
        //     unit: 'abc',
        //     condition: 'Good',
        //     icon: <Door
        //         name="door-closed"
        //         size={29}
        //         color="white"
        //     />
        // },
    ]

    const onPressFunction = (val, unit, title)=>{
        console.log('from on press '+ val)

        let passingValue = []
        let passingDate = []

        let stateVariable;
        if (val === 'tvoc') {
            stateVariable = tvoc;
        } else if (val === 'humidity') {
            stateVariable = humidity;
        } else if (val === 'carbonDioxide') {
            stateVariable = carbonDioxide;
        } else if (val === 'temperature') {
            stateVariable = temp;
        } else if (val === 'airpressure') {
            stateVariable = airpressure;
        }else if (val === 'historicalin') {
            stateVariable = historicalIn;
        }else if (val === 'historicalout') {
            stateVariable = historicalOut;
        }

        if(stateVariable.length > 0){
            for (let index = 0; index < 6; index++) {
                if(stateVariable[index] > 0){
                    passingValue.push(stateVariable[index])
                    // format(passingDate.push(dates[index].toDate()), 'MM/dd')
                    passingDate.push(format(dates[index].toDate(), 'MM/dd') )
                    
                }
                
            }

            // console.log('passingValue ' + passingValue)
            // console.log('passingDate ' + passingDate)
        }


        passingValue.reverse()
        passingDate.reverse()
        navigation.navigate("Detail", { passingValue, passingDate, unit, title })
    }

  return (
      <ImageBackground source={require('../assets/bg.png')} style={styles.bgImage}>
            <ScrollView>

              <View style={styles.boxDiv}>

                {
                    loading ?
                        data.map((val) => (
                            <Pressable key={val.id} onPress={() => onPressFunction(val.varName, val.unit, val.name)}>
                                <LinearGradient
                                    colors={['rgba(0,0,0,0.1)', '#38B6FF']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    useAngle
                                    angle={110}
                                    style={styles.blurBox}
                                >
                                    <View style={styles.boxContent}>
                                        <View style={styles.boxHeadPart}>
                                            <Text style={styles.boxHeading}>{val.name}</Text>
                                            <Text style={styles.boxHeadingUnit}>({setValueInBox(val.varName)} {val.unit})</Text>
                                        </View>

                                        <AnimatedCircularProgress
                                            size={100}
                                            width={15}
                                            fill={val.value}
                                            tintColor="white"
                                            backgroundColor="#3d5875">
                                            {
                                                (fill) => (
                                                    <Text style={{ color: "white", fontSize: 22 }}>
                                                        {val.value}%
                                                    </Text>
                                                )
                                            }
                                        </AnimatedCircularProgress>

                                        <View style={styles.contentFooter}>
                                            <Text style={styles.contentFooterFirst}>{val.condition}</Text>
                                            <View>
                                                {val.icon}
                                            </View>
                                        </View>

                                    </View>

                                </LinearGradient>
                            </Pressable>
                        ))

                    :
                          <View style={{ flex: 1 / 0.9 }}>
                              <LottieView style={{ flex: 1 }} source={require('../assets/loading.json')} autoPlay loop resizeMode="cover" />
                        </View>
                }

                {
                    loading ?

                    <>
                        <Pressable>
                            <LinearGradient
                                colors={['rgba(0,0,0,0.1)', '#38B6FF']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                useAngle
                                angle={110}
                                style={styles.blurBox}
                            >
                                <View style={styles.boxContent}>
                                    <View style={styles.boxHeadPart}>
                                        <Text style={styles.boxHeading}>Historical In</Text>
                                        {/* <Text style={styles.boxHeadingUnit}>
                                        unit
                                        </Text> */}
                                    </View>

                                    {/* <AnimatedCircularProgress
                                        size={100}
                                        width={15}
                                        fill={20}
                                        tintColor="white"
                                        backgroundColor="#3d5875">
                                        {
                                            (fill) => (
                                                <Text style={{ color: "white", fontSize: 22 }}>
                                                    20%
                                                </Text>
                                            )
                                        }
                                    </AnimatedCircularProgress> */}

                                    <View style={styles.roundDivOuter}>
                                              <Text style={styles.roundText}>{setInOutValue('in')}</Text>
                                        {/* <View style={styles.roundDivInner}>
                                        </View> */}
                                    </View>

                                    <View style={styles.contentFooter}>
                                        {/* <Text style={styles.contentFooterFirst}>Good</Text> */}
                                        <View>
                                            <Door
                                                name="door-open"
                                                size={29}
                                                color="white"
                                            />
                                        </View>
                                    </View>

                                </View>

                            </LinearGradient>
                        </Pressable>

                        <Pressable>
                            <LinearGradient
                                colors={['rgba(0,0,0,0.1)', '#38B6FF']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                useAngle
                                angle={110}
                                style={styles.blurBox}
                            >
                                <View style={styles.boxContent}>
                                    <View style={styles.boxHeadPart}>
                                        <Text style={styles.boxHeading}>Historical Out</Text>
                                    </View>


                                    <View style={styles.roundDivOuter}>
                                              <Text style={styles.roundText}>{setInOutValue('out')}</Text>
                                    </View>

                                    <View style={styles.contentFooter}>
                                        <View>
                                            <Door
                                                name="door-closed"
                                                size={29}
                                                color="white"
                                            />
                                        </View>
                                    </View>

                                </View>

                            </LinearGradient>
                        </Pressable>
                    </>
                          
                    :
                    null

                }
                
              </View>
              
            </ScrollView>
        </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
    absoluteFillObject: {},
    lottieContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000
    },
    bgImage: {
        // width: "100%",
        // height: "100%",
        flex: 1,
    },
    boxDiv: {
        marginTop: 100,
        flexDirection: 'row',
        padding: 8,
        gap: 20,
        // alignItems: "center",
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    box: {
        width: 180,
        height: 200,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: 'yellow',
        backgroundColor: 'red',
        
    },
    blurBox: {
        width: 180,
        height: 200,
        borderRadius: 20,
    },
    boxContent:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    boxHeading: {
        color: "white",
        fontWeight: "bold",
        fontSize: 22,
        alignItems: 'center',
    },
    boxHeadPart: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center'
    },
    boxHeadingUnit: {
        color: "white",
        fontSize: 18,
    },
    contentFooter:{
        display: "flex",
        flexDirection: "row",
        gap: 75,
        // justifyContent: 'space-between',
        // alignItems: 'flex-end'
    },
    contentFooterFirst: {
        color: "white",
        fontSize: 16
    },
    roundDivOuter:{
        backgroundColor: '#38B6FF',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        padding: 30
    },
    // roundDivInner: {
    //     backgroundColor: '#38B6FF',
    //     borderRadius: 50,
    //     borderWidth: 0,
    //     padding: 30
    // },
    roundText:{
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    }
})
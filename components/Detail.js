import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import {React, useEffect, useLayoutEffect} from 'react'
import { LineChart} from "react-native-chart-kit";
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const Detail = ({navigation, route}) => {

  const { passingValue, passingDate, unit, title } = route.params

  useEffect(()=>{
    console.log('from detail.js ' + passingDate)
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Detail",
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
        <Text style={styles.charTitle}>{title}</Text>
        <LineChart
          data={{
            labels: passingDate,
            datasets: [
              {
                data: passingValue
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={400}
          // yAxisLabel="$"
          yAxisSuffix={unit}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "#38B6FF",
            backgroundGradientTo: "#56BEFA",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            },
            propsForLabels: {
              fontSize: 10
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 0,
          }}
        />
      </View>
    </ImageBackground>
  )
}

export default Detail

const styles = StyleSheet.create({
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
  charTitle: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15
  }
})
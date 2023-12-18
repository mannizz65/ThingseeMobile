# Project Title
HALTIAN THINGSEE PROJECT MOBILE
## Introduction
The app is the upgraded or V2 of the flutter mobile app project written in React-native. This app aims to connect with the sensors to provide with the real-time Air Quality and also with the counter sensor to count the number of people entering or exiting the Room or office. The app is capable of visualizing the realtime data in the raw form and also in graph view.

## Concept
The app is integrated with  two Thingsee sensors(Air sensor and countersensor) which were made available to our team by the Haltian comapany. The sensor is also capable of monitoring the realtime data and send the data to the locally connected gateway from where the data is transmitted directly to the Aws cloud. which is received in the node.js [backend server](https://github.com/Haltian-company-project/backend) after verifing the certificates. The server is regularly sending the data to the firebase which is then received to the front end which is the mobile app.

## Acknowledgements

- [Thingsee AIR: [Haltian](https://haltian.com/product/thingsee-air/)

Thingsee AIR serves as a battery-operated wireless IoT sensor designed for monitoring indoor air quality. It tracks parameters such as Co², TVOC, temperature, barometric pressure, and humidity, offering a comprehensive view of both current air quality data and historical data.

- [Thingsee COUNT: [Haltian](https://haltian.com/product/thingsee-count-people-counter/)

Thingsee COUNT: Thingsee COUNT is an IoT sensor device capable of sensing movement beneath it and providing reports on the frequency and direction of detected movements.



### Prerequisites
Before you begin, ensure you have met the following Packages:
  - ** react-native-community/blur
  - ** react-native-firebase/app
  - ** react-native-firebase/auth
  - ** react-native-firebase/firestore
  - ** react-navigation/native
  - ** react-navigation/native-stack
  - ** date-fns
  - ** lottie-react-native
  - ** react-native-chart-kit
  - ** react-native-circular-progress
  - ** react-native-linear-gradient
  - ** react-native-safe-area-context
  - ** react-native-screens
  - ** react-native-svg
  - ** react-native-vector-icons


## Features
- **Node.js API Integration**: Fetch machine data from a Node.js API.
- **Data Visualization**: Display machine data in line and bar charts for  time periods.
- **Location Data Visialization**: Show the user's current location using geolocation. Data fetch from third party api.


## Getting Started
 Clone the repository on a directory of your choice.
## Installation

1. **Clone this repository:**

   ```bash
   git clone https://github.com/mannizz65/ThingseeMobile
   cd your-project
Install project dependencies:
```bash
# using npm
npm install
# using yarn
yarn install
```
## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn run android
```

### Mobile View
![mobile](https://github.com/Shaik-Chapal/thingsee-frontend/assets/43337898/9f5e7767-947e-4e3c-b371-a121f658cf6a)

## Contact

Manish Panthi - manishpanthi040@gmail.com - [Github](https://github.com/mannizz65)

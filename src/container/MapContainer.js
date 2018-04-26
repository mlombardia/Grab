import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar
} from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import DriverInformationMapView from "../component/DriverInfomationMapView";
import ScreenDimensions from "../helper/ScreenDimensions";
import Colors from "../color/Colors";
import MapContainerText from "../i18n/spanish/MapContainerText";
import googleMapsAPIKey from "../API/googleAPIKey";

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ScreenDimensions.aspectRatio;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

const origin = { latitude: -34.603736, longitude: -58.381573 };
const destination = { latitude: -36.372789, longitude: -56.711326 };

export default class MapContainer extends React.Component {
  static navigationOptions = {
    title: MapContainerText.title,
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTitleStyle: {
      color: "white",
      fontFamily: "MuseoSansRounded-300",
      fontWeight: "300",
      marginLeft: ScreenDimensions.width / 3.5
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      estimatedArrivalTime: 0
    };

    this.mapView = null;
  }

  render() {
    const { driver } = this.props.navigation.state.params;
    const { user } = this.props.navigation.state.params;

    const origin = {
      latitude: user.latitude,
      longitude: user.longitude,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta
    };

    const destination = {
      latitude: driver.location.latitude,
      longitude: driver.location.longitude,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta
    };

    return (
      <View accessible={true} style={styles.container}>
        <StatusBar backgroundColor={Colors.dark} barStyle="light-content" />
        <MapView
          style={styles.map}
          initialRegion={origin}
          ref={c => (this.mapView = c)}
        >
          <MapView.Marker coordinate={origin} title="Origin" />
          <MapView.Marker coordinate={destination} title="Destination" />
          <MapViewDirections
            strokeWidth={4}
            strokeColor="red"
            origin={origin}
            destination={destination}
            apikey={googleMapsAPIKey}
            onReady={result => {
              this.setState({ estimatedArrivalTime: result.duration });
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: ScreenDimensions.width / 20,
                  bottom: ScreenDimensions.height / 20,
                  left: ScreenDimensions.width / 20,
                  top: ScreenDimensions.height / 20
                }
              });
            }}
            onError={errorMessage => {
              console.log(errorMessage);
            }}
          />
        </MapView>
        <DriverInformationMapView
          estimatedArrivalTime={this.state.estimatedArrivalTime}
          driver={{
            carId: "CAW-511",
            isDriver: true,
            location: { latitude: -34.601855, longitude: -58.469107 },
            phoneNumber: "011-5121-6344",
            problem: "carTow",
            userName: "Pablo Ramirez",
            __v: 0,
            _id: "5ae246d24a0b93d98c1fa422"
          }}
        />
      </View>
    );
  }
}

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import ScreenDimensions from "../helper/ScreenDimensions";
import Colors from "../color/Colors";
import Communications from "react-native-communications";
import MapContainerText from "../i18n/spanish/MapContainerText";

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: Colors.baseLight
  },
  bubble: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  phoneButton: {
    borderWidth: 1,
    borderColor: Colors.baseDark,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    width: ScreenDimensions.width / 6,
    height: ScreenDimensions.width / 6,
    borderRadius: 100
  },
  driverImage: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: ScreenDimensions.width / 6,
    height: ScreenDimensions.width / 6,
    borderRadius: 100
  }
});

const DriverInformationMapView = ({ estimatedArrivalTime, driver }) => {
  console.log(driver);
  const hours = Math.floor(estimatedArrivalTime / 60);
  const minutes = parseInt(estimatedArrivalTime % 60);
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.bubble}>
        <View>
          <Image
            style={styles.driverImage}
            source={require("../image/driver1.png")}
          />
        </View>
        <View>
          <Text>
            {MapContainerText.name}: {driver.userName}
          </Text>
          <Text>
            {MapContainerText.carId}: {driver.carId}
          </Text>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            {MapContainerText.arrivalTime}: {hours}:{minutes} hs
          </Text>
        </View>
        <TouchableOpacity
          style={styles.phoneButton}
          onPress={() => Communications.phonecall(driver.phoneNumber, true)}
        >
          <Icon name="phone" type="font-awesome" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverInformationMapView;

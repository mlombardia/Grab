import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ProgressBarAndroid
} from "react-native";
import ProblemInfoText from "../i18n/spanish/ProblemInfoText";
import ScreenDimensions from "../helper/ScreenDimensions";
import Colors from "../color/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.baseLight
  },
  component: {
    padding: 12,
    justifyContent: "space-between",
    height: ScreenDimensions.height / 4
  }
});

const LoadingDriver = () => {
  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Text style={{ fontSize: 20 }}>{ProblemInfoText.sendingRequest}</Text>
        <ProgressBarAndroid styleAttr="Inverse" color={Colors.dark} />
      </View>
    </View>
  );
};

export default LoadingDriver;

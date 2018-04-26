import React from "react";
import { View, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import Login from "./src//container/Login";
import MapContainer from "./src/container/MapContainer";
import ProblemInfo from "./src//container/ProblemInfo";

const RootStack = StackNavigator(
  {
    MapContainer: {
      screen: MapContainer
    },
    Login: {
      screen: Login
    },
    ProblemInfo: {
      screen: ProblemInfo
    }
  },
  {
    initialRouteName: "Login"
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

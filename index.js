import { AppRegistry } from "react-native";
import App from "./App";

//TODO: Remove this
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

AppRegistry.registerComponent("Gruber", () => App);

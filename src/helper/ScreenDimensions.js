import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const ScreenDimensions = {
  width,
  height,
  aspectRatio: width / height
};

export default ScreenDimensions;

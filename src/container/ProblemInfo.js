import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";
import ScreenDimensions from "../helper/ScreenDimensions";
import Colors from "../color/Colors";
import ProblemInfoText from "../i18n/spanish/ProblemInfoText";
import { CheckBox } from "react-native-elements";
import usersAPI from "../API/usersAPI";
import LoadingDriver from "../component/LoadingDriver";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.baseLight
  },
  content: {
    width: ScreenDimensions.width,
    height: ScreenDimensions.height / 1.65,
    backgroundColor: Colors.baseLight,
    justifyContent: "space-between",
    alignItems: "center"
  },
  checkBoxWrapper: {
    width: ScreenDimensions.width,
    height: ScreenDimensions.height / 2.25,
    backgroundColor: Colors.baseLight,
    justifyContent: "center"
  },
  submitButtonWrapper: {
    width: ScreenDimensions.width - ScreenDimensions.width / 8
  }
});

export default class Login extends React.Component {
  static navigationOptions = {
    title: ProblemInfoText.title,
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTitleStyle: {
      color: "white",
      fontFamily: "MuseoSansRounded-300",
      fontWeight: "300",
      marginLeft: ScreenDimensions.width / 5
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      checkBoxSelected: false,
      sendingRequest: false
    };
  }

  handleChecked = event => {
    this.setState({ checkBoxSelected: event });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(success => {
      this.setState({
        latitude: success.coords.latitude,
        longitude: success.coords.longitude
      }),
        error => console.log(error);
    });
  }

  submitForm = () => {
    this.setState({ sendingRequest: true });
    usersAPI
      .getDriver()
      .then(resp => {
        const i = Math.floor(Math.random() * resp.length);
        this.props.navigation.replace("MapContainer", {
          driver: resp[i],
          user: {
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    if (this.state.sendingRequest) {
      return <LoadingDriver />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={{ padding: 12 }}>
              <Text style={{ fontSize: 20 }}>{ProblemInfoText.header}</Text>
            </View>
            <View style={styles.checkBoxWrapper}>
              <CheckBox
                title={ProblemInfoText.carTow}
                checked={this.state.checkBoxSelected === "carTow"}
                onPress={() => this.handleChecked("carTow")}
              />
              <CheckBox
                title={ProblemInfoText.lightMechanics}
                checked={this.state.checkBoxSelected === "lightMechanics"}
                onPress={() => this.handleChecked("lightMechanics")}
              />
              <CheckBox
                title={ProblemInfoText.tiresChange}
                checked={this.state.checkBoxSelected === "tiresChange"}
                onPress={() => this.handleChecked("tiresChange")}
              />
              <CheckBox
                title={ProblemInfoText.extraction}
                checked={this.state.checkBoxSelected === "extraction"}
                onPress={() => this.handleChecked("extraction")}
              />
              <CheckBox
                title={ProblemInfoText.fuelAndLubricants}
                checked={this.state.checkBoxSelected === "fuelAndLubricants"}
                onPress={() => this.handleChecked("fuelAndLubricants")}
              />
            </View>
            <View style={styles.submitButtonWrapper}>
              <Button
                disabled={!this.state.checkBoxSelected}
                style={styles.submitButton}
                title={ProblemInfoText.submitButton}
                onPress={() => this.submitForm()}
                color={Colors.primary}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

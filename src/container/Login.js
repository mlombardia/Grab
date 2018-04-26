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
import LoginText from "../i18n/spanish/LoginText";
import Colors from "../color/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  imageContainer: {
    height: ScreenDimensions.height / 3,
    width: ScreenDimensions.width,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center"
  },
  loginForm: {
    height: 2 * (ScreenDimensions.height / 3),
    width: ScreenDimensions.width,
    backgroundColor: Colors.baseDark,
    alignItems: "center",
    justifyContent: "center"
  },
  loginFormWrapper: {
    height: ScreenDimensions.height / 5,
    justifyContent: "space-between",
    backgroundColor: Colors.baseDark,
    alignItems: "center"
  },
  textInput: {
    height: 40,
    fontSize: 20,
    width: ScreenDimensions.width - ScreenDimensions.width / 8
  },
  submitButtonWrapper: {
    width: ScreenDimensions.width - ScreenDimensions.width / 8
  },
  submitButton: {
    backgroundColor: "red"
  }
});

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      clientNumber: ""
    };
  }

  submitForm = () => {
    this.props.navigation.replace("ProblemInfo");
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar backgroundColor={Colors.dark} barStyle="light-content" />
        <View style={styles.imageContainer}>
          <Text>TOM PASAME LA FOTO</Text>
        </View>
        <KeyboardAvoidingView
          style={styles.loginForm}
          behavior="padding"
          enabled
        >
          <View style={styles.loginFormWrapper}>
            <Text style={{ fontSize: 20 }}>
              {LoginText.loginLabelInputText}
            </Text>
            <TextInput
              placeholder={LoginText.inputClientID}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={clientNumber => this.setState({ clientNumber })}
              value={this.state.clientNumber}
            />
            <View style={styles.submitButtonWrapper}>
              <Button
                style={styles.submitButton}
                title={LoginText.submitButton}
                onPress={() => this.submitForm()}
                color={Colors.primary}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    );
  }
}

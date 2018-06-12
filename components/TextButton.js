import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {white, purple} from '../utils/colors'

const TextButton = ({ children, onPress, disabled = false, style = {} }) => (
  <TouchableOpacity
    style={
      Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn
    }
    disabled={disabled}
    onPress={onPress}>
    <Text style={[styles.submitBtnTxt, style]}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnTxt: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
});

export default TextButton;

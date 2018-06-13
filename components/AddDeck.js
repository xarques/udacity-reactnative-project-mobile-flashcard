import React, { Component} from "react";
import {View, Text, StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import { saveDeckTitle } from "../utils/api";
import { saveDeck } from "../actions";
import TextButton from "./TextButton";

class AddDeck extends Component {
  state = {
    text: ""
  };

  submit = () => {
    this.props.dispatch(saveDeck(this.state.text));
    this.toDeck(this.state.text.trim().replace(" ", ""));
    saveDeckTitle(this.state.text);
  };

  toDeck = key => {
    this.props.navigation.navigate("Deck", { key });
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>Name of the new Deck</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          placeholder="Deck name"
          value={this.state.text}
        />
        <TextButton
          disabled={this.state.text === ""}
          styles={{ padding: 10 }}
          onPress={this.submit}
        >
          Create Deck
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    padding: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 10,
    padding:5,
    fontSize: 20,
  }
})

export default connect()(AddDeck)

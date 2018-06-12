import React, { Component} from "react";
import {View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { addCardToDeck } from "../utils/api";
import { addCard } from "../actions";
import TextButton from "./TextButton";

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  submit = () => {
    this.props.dispatch(addCard(this.state, this.props.deckKey));
    this.toDeck();
    addCardToDeck({card: this.state, key: this.props.deckKey});
  };

  toDeck = () => {
    this.props.navigation.navigate("Deck", { key: this.props.deckKey });
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>Name of the new Deck</Text>
        <TextInput
          style={styles.input}
          onChangeText={question => this.setState({ question })}
          placeholder="Question"
          value={this.state.question}
        />
        <TextInput
          style={styles.input}
          onChangeText={answer => this.setState({ answer })}
          placeholder="Answer"
          value={this.state.answer}
        />
        <TextButton
          disabled={this.state.question === '' || this.state.answer === ''}
          styles={{ padding: 10 }}
          onPress={this.submit}
        >Submit</TextButton>
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

const mapStateToProps = (state, navigation) => {
  return {
    deckKey: navigation.navigation.state.params.key
  };
};

export default connect(mapStateToProps)(AddCard);

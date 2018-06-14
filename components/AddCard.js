import React, { Component} from "react";
import {View, Text, StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import { addCardToDeck } from "../utils/api";
import { addCard } from "../actions";
import TextButton from "./TextButton";
import DeckHeader from "./DeckHeader";

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  submit = () => {
    this.props.dispatch(addCard(this.state, this.props.deckKey));
    this.toDeck();
    addCardToDeck({ card: this.state, key: this.props.deckKey });
  };

  toDeck = () => {
    // Replace the AddCard component from the navigation stack
    // to avoid coming back to this screen when the user presses Back key
    this.props.navigation.replace("Deck", { deckKey: this.props.deckKey });
  };

  render() {
    const { title, size } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <DeckHeader title={title} size={size} />
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
          disabled={this.state.question === "" || this.state.answer === ""}
          styles={{ padding: 10 }}
          onPress={this.submit}
        >
          Submit
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
    padding: 5,
    fontSize: 20,
  }
})

const mapStateToProps = (state, navigation) => {
  const deckKey = navigation.navigation.state.params.deckKey;
  const size = state[deckKey].questions ? state[deckKey].questions.length : 0
  return {
    deckKey,
    title: state[deckKey].title,
    size
  };
};

export default connect(mapStateToProps)(AddCard);

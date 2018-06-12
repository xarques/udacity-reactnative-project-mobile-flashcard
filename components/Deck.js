import React, { Component} from "react";
import {View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TextButton from "./TextButton";

class Deck extends Component {
  render() {
    const { deckKey, deck } = this.props;
    const size = deck.questions ? deck.questions.length : 0;
    return <View>
        <Text style={{ fontSize: 30 }}>Deck {deck.title}</Text>
        <Text style={{ fontSize: 15 }}>
          {size} question{size > 0 ? "s" : ""}
        </Text>
        <View style={styles.buttons}>
          <TextButton styles={{ padding: 10 }} onPress={() => this.props.navigation.navigate("AddCard", { key: deckKey})}>
          Add Card
          </TextButton>
          {size > 0 &&
            <TextButton styles={{ padding: 10 }} onPress={this.startQuiz}>
              Start Quizz
            </TextButton>
          }
        </View>
      </View>;
  }
}

const styles = StyleSheet.create({
  buttons: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "flex-end"
  }
});

const mapStateToProps = (state, navigation) => {
  return {
    deckKey: navigation.navigation.state.params.key,
    deck: state[navigation.navigation.state.params.key]
  };
};

export default connect(mapStateToProps)(Deck);

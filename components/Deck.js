import React, { Component} from "react";
import {View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TextButton from "./TextButton";
import DeckHeader from "./DeckHeader";

class Deck extends Component {
  render() {
    const { deckKey, deck } = this.props;
    const size = deck.questions ? deck.questions.length : 0;
    return <View style={ styles.deck }>
      <DeckHeader title={deck.title} size={size} />
      <View style={styles.buttons}>
        {size > 0 &&
          <TextButton style={{}} onPress={() => this.props.navigation.navigate("Quiz", { key: deckKey })}>
            Start Quizz
          </TextButton>
        }
        <TextButton style={{ }} onPress={() => this.props.navigation.navigate("AddCard", { key: deckKey})}>
        Add Card
        </TextButton>
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10
  }
});

const mapStateToProps = (state, navigation) => {
  return {
    deckKey: navigation.navigation.state.params.key,
    deck: state[navigation.navigation.state.params.key]
  };
};

export default connect(mapStateToProps)(Deck);

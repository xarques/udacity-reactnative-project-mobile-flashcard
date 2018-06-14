import React, { Component} from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TextButton from "./TextButton";
import DeckHeader from "./DeckHeader";
import { clearLocalNotification, setLocalNotification} from "../utils/helpers";

class Quiz extends Component {
  state = {
    cardNumber: 0,
    score: 0,
    displayQuestion: true
  }

  reset = () => {
    this.setState({
      cardNumber: 0,
      score: 0,
      displayQuestion: true
    })
  }
  correct = () => {
    this.setState(state => (
      {
        cardNumber: state.cardNumber + 1,
        score: state.score + 1,
        displayQuestion: true
      }
    ))
  }

  incorrect = () => {
    this.setState(state => ({
      ...state,
      cardNumber: state.cardNumber + 1,
      displayQuestion: true
    }));
  }

  flip = question => {
    this.setState(state => ({
      ...state,
      displayQuestion: question
    }))
  }

  complete = () => {
    clearLocalNotification()
      .then(setLocalNotification);
  }

  renderQuestionOrAnswer = ({ question, answer }) => {
    return <View style={styles.quiz}>
      <View style={styles.question}>
        <Text style={{ fontSize: 30 }}>{question ? `${question} ?` : answer}</Text>
      </View>
      <View style={styles.buttons}>
        {question &&
          <TextButton style={{}} onPress={() => this.flip(false)}>
            Show Answer
            </TextButton>
        }
        {answer &&
          <TextButton style={{}} onPress={() => this.flip(true)}>
            Go Back to Question
              </TextButton>
        }
        <TextButton style={{ backgroundColor: "green" }} onPress={this.correct}>
          Correct
          </TextButton>
        <TextButton style={{ backgroundColor: "red" }} onPress={this.incorrect}>
          Incorrect
          </TextButton>
      </View>
    </View>;
  }

  render() {
    const { cardNumber, score, displayQuestion } = this.state;
    const { deckKey, deck } = this.props;
    const title = deck.title;
    const size = deck.questions ? deck.questions.length : 0;
    if (cardNumber <= size - 1) {
      const questions = deck.questions;
      const question = questions[cardNumber].question;
      const answer = questions[cardNumber].answer;
      return <View style={styles.quiz}>
        <DeckHeader
          title={title}
          size={size}
          cardNumber={cardNumber}
        />
        {/* <Text style={styles.counter}>
          {cardNumber + 1}/{size}
        </Text> */}
        {this.renderQuestionOrAnswer(displayQuestion ? { question } : { answer })}
      </View>;
    } else {
      // Reschedule notification
      this.complete();
      return <View style={styles.quiz}>
        <DeckHeader
          title={title}
          size={size}
          score={score}
          cardNumber={cardNumber}
        />
        <View style={styles.buttons}>
          <TextButton onPress={this.reset}>Restart Quiz</TextButton>
          <TextButton
            onPress={() =>
              this.props.navigation.navigate("Deck", { deckKey })
            }
          >
            Back To Deck
            </TextButton>
        </View>
      </View>;
    }
  }
}

const styles = StyleSheet.create({
  quiz: {
    flex: 1
  },
  counter: {
    margin: 10,
    fontSize: 20
  },
  question: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
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
  const deckKey = navigation.navigation.state.params.deckKey;
  return {
    deckKey,
    deck: state[deckKey]
  };
};

export default connect(mapStateToProps)(Quiz);

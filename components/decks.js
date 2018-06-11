import React, {Component } from 'react';
import { View, Text, Stylesheet } from 'react-native';
import { connect } from "react-redux";
import * as actions from "../actions";

class Decks extends Component {


  componentDidMount = () => {
    this.props.dispatch(actions.fetchDecks());
  }

  render() {
    console.log("Deck props ", JSON.stringify(this.props));
    console.log("Deck state ", this.state);
    const { decks } = this.props;
    return (
      <View>
        {Object.keys(decks).map(key => {
          const { title, questions } = decks[key];
          return (
            <Text key={key}>Deck {title}</Text>
          )
        })}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(Decks);

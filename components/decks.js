import React, {Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView
 } from 'react-native';
import { connect } from "react-redux";
import { getDecks } from "../actions";
import { fetchDecks } from "../utils/api";
import { AppLoading } from "expo";
import { purple, white } from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";

class Decks extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks()
      .then(decks => {
        dispatch(getDecks(JSON.parse(decks)));
      })
      .then(() => this.setState(() => ({ ready: true })));
  }

  renderItem = (title, deckKey, size) => (
    <View key={deckKey}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.props.navigation.navigate("Deck", { deckKey })}
      >
        <Text key={deckKey} style={{ fontSize: 30 }}>
          {title}
        </Text>
        <Text style={{ fontSize: 15 }}>
          {size} card{size > 1 ? "s" : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          {decks &&
            Object.keys(decks).map(key => {
              const { title, questions } = decks[key];
              return this.renderItem(
                title,
                key,
                questions ? questions.length : 0
              );
            })}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AddDeck")}
        >
          <Ionicons
            name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
            style={styles.button}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  button: {
    position: "absolute",
    bottom: 14,
    right: 20,
    color: "#01a699",
    fontSize: 100,
    fontWeight: "900"
  }
});

const mapStateToProps = state => {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(Decks);

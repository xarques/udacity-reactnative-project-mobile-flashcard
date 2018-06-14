import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View, AsyncStorage } from "react-native";
import { createStore } from "redux";
import { Provider } from 'react-redux';
import reducer from './reducers';
import Decks from "./components/Decks";
import Deck from "./components/Deck";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";

import { setLocalNotification } from "./utils/helpers";
import { purple, white } from "./utils/colors";
import { Constants } from "expo";

import {
  createStackNavigator
} from "react-navigation";
const UdacityStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const MainNavigator = createStackNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: "FlashCards"
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: "Add a deck",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: "Deck",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add a card",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
});

export default class App extends Component {
  componentDidMount = () => {
    setLocalNotification();
  }

  render() {
    return <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <View syle={{ height: 20 }} />
          <UdacityStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

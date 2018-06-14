import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View, AsyncStorage, Platform } from "react-native";
import { createStore } from "redux";
import { Provider } from 'react-redux';
import reducer from './reducers';
import Decks from "./components/Decks";
import Deck from "./components/Deck";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { Ionicons } from "@expo/vector-icons";

import { setLocalNotification } from "./utils/helpers";
import { purple, white } from "./utils/colors";
import { Constants } from "expo";

import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";

const UdacityStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const tabsStructure = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      )
    }
  },
  NewDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-add" size={30} color={tintColor} />
      )
    }
  }
};

const tabBarOptions = {
  activeTintColor: Platform.OS === "ios" ? purple : white,
  style: {
    height: 56,
    backgroundColor: Platform.OS === "ios" ? white : purple,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
}

const navigationOptions = {
  header: null
}

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator(tabsStructure, {
      navigationOptions, tabBarOptions
    })
    : createMaterialTopTabNavigator(tabsStructure, { tabBarOptions });

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "FlashCards"
    }
  },
  Decks: {
    screen: Decks,
    navigationOptions: {
      title: "FlashCards"
    }
  },
  // AddDeck: {
  //   screen: AddDeck,
  //   navigationOptions: {
  //     title: "Add a deck",
  //     headerTintColor: white,
  //     headerStyle: {
  //       backgroundColor: purple
  //     }
  //   }
  // },
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

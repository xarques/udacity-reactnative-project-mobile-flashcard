import { AsyncStorage } from 'react-native';

export const DECK_STORAGE_KEY = 'UdaciCards:deck';

export const getDeck = async key => {
  try {
    const results = await AsyncStorage.getItem(DECK_STORAGE_KEY);
    const decks = JSON.parse(results);
    console.log("Decks from getDeck", decks);
    return decks[key];
  } catch (error) {
    return null;
  }
}

// export const fetchDecks = () => {
//   AsyncStorage.getItem(DECK_STORAGE_KEY)
//     .then(results => {
//       return JSON.parse(results);
//     })
// }
export const getDecks = async () => {
  try {
    const results = await AsyncStorage.getItem(DECK_STORAGE_KEY);
    const decks = JSON.parse(results);
    console.log("Decks from getDecks", decks);
    return decks;
  } catch (error) {
    return null;
  }
}

export const saveDeckTitle = ({title, key}) => {
  AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(
    {
      [key]: title
    }
  ))
}

export const addCardToDeck = ({card, key}) => {
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      const deck = data[key];
      if (deck) {
        deck[questions].push(card);
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
      }
    })
}

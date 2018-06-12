import { AsyncStorage } from 'react-native';

export const DECK_STORAGE_KEY = 'UdaciCards:decks';


// export const getDeck = async key => {
//   try {
//     const results = await AsyncStorage.getItem(DECK_STORAGE_KEY);
//     const decks = JSON.parse(results);
//     console.log("Decks from getDeck", decks);
//     return decks[key];
//   } catch (error) {
//     return null;
//   }
// }

export const fetchDecks = () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    // .then(results => {
    //   console.log("FetchDecks", results);
    //   return results === null
    //   ? {}
    //   : JSON.parse(results)
    // })
    // .catch(err => {
    //   console.err("fetchDecks ERROR", err);
    // })
}

// export const getDecks = async () => {
//   try {
//     const results = await AsyncStorage.getItem(DECK_STORAGE_KEY);
//     const decks = JSON.parse(results);
//     console.log("Decks from getDecks", decks);
//     return decks;
//   } catch (error) {
//     return null;
//   }
// }

export const saveDeckTitle = title => {
  const key = title.trim().replace(" ", "");
  AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(
    {
      [key]: {title: title}
    }
  ))
}

export const addCardToDeck = ({card, key}) => {
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      const deck = data[key];

      if (deck) {
        if (!deck.questions) {
          deck.questions = [];
        }
        deck.questions.push(card);
        AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(
          {
            [key]: deck
          }
        ));
      }
    })
}

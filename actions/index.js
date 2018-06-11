import {getDeck, getDecks, saveDeckTitle, addCardToDeck } from "../utils/api";

export const GET_DECKS = "GET_DECKS";
export const GET_DECK = "GET_DECK";
export const SAVE_DECK = "SAVE_DECK";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";

export const fetchDecks = () => (
  {
    type: GET_DECKS,
    decks: getDecks()
  }
)

export const fetchDeck = key => (
  {
    type: GET_DECK,
    deck: getDeck(key)
  }
)

export const saveDeck = title => {
  const key = title.trim().replace(" ","");
  saveDeckTitle({title, key});
  return {
    type: SAVE_DECK,
    key,
    deck: { title }
  }
}

export const addCard = (card, key) => {
  addCardToDeck(card, key);
  return {
      type: ADD_CARD_TO_DECK,
      card,
      key
    }
  }

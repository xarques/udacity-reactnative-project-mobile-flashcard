export const GET_DECKS = "GET_DECKS";
export const SAVE_DECK = "SAVE_DECK";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";

export const getDecks = decks => (
  {
    type: GET_DECKS,
    decks
  }
)

export const saveDeck = title => {
  return {
    type: SAVE_DECK,
    title
  }
}

export const addCard = (card, key) => {
  return {
      type: ADD_CARD_TO_DECK,
      card,
      key
    }
  }

import { GET_DECKS, GET_DECK, SAVE_DECK, ADD_CARD_TO_DECK } from "../actions";

const entries = (state = {}, action) => {
  console.log("Reducer state", JSON.stringify(state));
  console.log("Reducer action decks", JSON.stringify(action));
  switch (action.type) {
    case GET_DECKS:
      return (
        action.decks
      )
    case GET_DECK:
      return action.deck;
    case  SAVE_DECK:
      return {
        ...state,
        [action.key]: action.deck
      }
    case ADD_CARD_TO_DECK:
      // TODO: Clone state
      const newDeck = state[action.key];
      newDeck["questions"].push(action.card);
      return {
        ...state,
        [action.key] : newDeck
      };
    default:
      return state;
  }
}

export default entries;


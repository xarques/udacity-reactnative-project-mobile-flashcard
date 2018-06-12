import { GET_DECKS, SAVE_DECK, ADD_CARD_TO_DECK } from "../actions";

const entries = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case SAVE_DECK:
      return {
        ...state,
        [action.title.trim().replace(" ", "")]: {title: action.title}
      };
    case ADD_CARD_TO_DECK:
      // TODO: Clone state
      const newDeck = state[action.key];
      if (!newDeck["questions"]) {
        newDeck["questions"] = [];
      }
      newDeck["questions"].push(action.card);
      return {
        ...state,
        [action.key]: newDeck
      };
    default:
      return state;
  }
};

export default entries;


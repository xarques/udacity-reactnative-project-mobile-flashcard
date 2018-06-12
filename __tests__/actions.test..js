import * as actions from "../actions";

describe('actions', () => {
  it('should create and action to save a deck', () => {
    const title = "Redux Deck";
    const expectedAction = {
      type: actions.SAVE_DECK,
      title
    }
    expect(actions.saveDeck("Redux Deck")).toEqual(expectedAction);
  })
})

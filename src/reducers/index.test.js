import reducer from './index';
import { SEARCH_ENGINE_CHANGED, SEARCH_TEXT_CHANGED, RECEIVE_SEARCH, REQUEST_SEARCH } from '../actions';

const initialState = {
  search: {
    isFetching: false,
    items: [],
  },
  searchEngine: "both",
  searchText: ""
};

describe('reducers', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("reducer when searchText action", () => {
    expect(reducer(initialState, { type: SEARCH_TEXT_CHANGED, searchText: 'code' })).toEqual({
      ...initialState,
      searchText: "code",
    });
  });


  it("reducer when change engine action", () => {
    expect(reducer(initialState, { type: SEARCH_ENGINE_CHANGED, searchEngine: 'google' })).toEqual({
      ...initialState,
      searchEngine: "google",
    });
  });

  it("reducer when fire request action", () => {
    expect(reducer(initialState, { type: REQUEST_SEARCH })).toEqual({
      ...initialState, search: { isFetching: true, items: [] }
    });
  });

  it("reducer when fire request action", () => {
    expect(reducer(initialState, { type: RECEIVE_SEARCH, data: ["example"] })).toEqual({
      ...initialState, search: { isFetching: false, items: ["example"] }
    });
  });

})
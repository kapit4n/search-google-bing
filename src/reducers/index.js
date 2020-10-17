import { combineReducers } from 'redux';
import { REQUEST_SEARCH, RECEIVE_SEARCH, SEARCH_TEXT_CHANGED, SEARCH_ENGINE_CHANGED } from '../actions';

const searchText = (state = '', action) => {
  switch (action.type) {
    case SEARCH_TEXT_CHANGED:
      return action.searchText;
    default:
      return state;
  }
}

const searchEngine = (state = 'both', action) => {
  switch (action.type) {
    case SEARCH_ENGINE_CHANGED:
      return action.searchEngine;
    default:
      return state;
  }
}

const search = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_SEARCH:
      return {
        ...state,
        isFetching: true,
        items: []
      };
    case RECEIVE_SEARCH:
      return {
        ...state,
        isFetching: false,
        items: action.data
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  searchText,
  searchEngine,
  search,
})

export default rootReducer;
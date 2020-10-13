import { SEARCH_TEXT_CHANGED, SEARCH_ENGINE_CHANGED, REQUEST_SEARCH, RECEIVE_SEARCH, searchTextAction, searchEngineAction, requestSearch, receiveSearch } from './index';

describe('actions', () => {
  it('should create the action to change text', () => {
    const searchText = 'react';
    const expectedAction = {
      searchText,
      type: SEARCH_TEXT_CHANGED
    };

    expect(searchTextAction(searchText)).toEqual(expectedAction)
  });

  it('should create the action to change text', () => {
    const searchEngine = 'google';
    const expectedAction = {
      searchEngine,
      type: SEARCH_ENGINE_CHANGED
    };

    expect(searchEngineAction(searchEngine)).toEqual(expectedAction)
  });

  it('should create the action to change text', () => {
    const expectedAction = {
      type: REQUEST_SEARCH
    };

    expect(requestSearch()).toEqual(expectedAction)
  });

  it('should create the action to change text', () => {
    const expectedAction = {
      type: RECEIVE_SEARCH,
      data: []
    };

    expect(receiveSearch([])).toEqual(expectedAction)
  });

})





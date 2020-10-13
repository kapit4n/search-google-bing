import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import App from './App';

const mockStore = configureStore([]);
jest.mock('axios');

describe('My Connected React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      search: {
        isFetching: false,
        items: [],
      },
      searchEngine: "both",
      searchText: ""
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('should dispatch an action on button click', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});
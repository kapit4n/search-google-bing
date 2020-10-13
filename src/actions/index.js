import Axios from "axios";

export const SEARCH_TEXT_CHANGED = 'SEARCH_TEXT_CHANGED';
export const SEARCH_ENGINE_CHANGED = 'SEARCH_ENGINE_CHANGED';
export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';

export const searchTextAction = searchText => ({
  type: SEARCH_TEXT_CHANGED,
  searchText
});

export const searchEngineAction = searchEngine => ({
  type: SEARCH_ENGINE_CHANGED,
  searchEngine
});

export const requestSearch = () => ({
  type: REQUEST_SEARCH,
});

export const receiveSearch = (data) => ({
  type: RECEIVE_SEARCH,
  data
});

export const fetchSearch = (searchText, state) => dispatch => {
  const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const bingKey = process.env.REACT_APP_BING_API_KEY;

  dispatch(requestSearch())
  let googleReq = Axios.get(`https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=000888210889775888983:y9tkcjel090&q=${searchText}`);
  let bingReq = Axios.get(`https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=${searchText}`,
    {
      headers: { 'Ocp-Apim-Subscription-Key': bingKey }
    });

  if (state.searchEngine === 'google') {
    return googleReq.then(data => {
      return dispatch(receiveSearch(data.data.items));
    })
  } else if (state.searchEngine === 'bing') {
    return bingReq.then(data => {
      return dispatch(receiveSearch(data.data.value.map(x => {
        return { title: x.name, htmlSnippet: x.description, link: x.url, displayLink: x.url }
      })));
    });
  } else if (state.searchEngine === 'both') {
    return Promise.all([bingReq, googleReq]).then(values => {
      let bingData = values[0].data.value.map(x => {
        return { title: x.name, htmlSnippet: x.description, link: x.url, displayLink: x.url }
      });
      let googleData = values[1].data.items;
      let joinData = [...bingData, ...googleData];
      return dispatch(receiveSearch(joinData));
    })
  }
}

export const searchAction = searchText => (dispatch, getState) => {
  return dispatch(fetchSearch(searchText, getState()))
}

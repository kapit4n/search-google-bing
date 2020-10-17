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

export const searchAction = (searchText) => (dispatch, getState) => {
  const state = getState();
  const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const bingKey = process.env.REACT_APP_BING_API_KEY;

  dispatch(requestSearch());

  let googleReq = Axios.get(`https://www.googleapis.com/customsearch/v1?key=${googleKey}&cx=000888210889775888983:y9tkcjel090&q=${searchText}`);
  let bingReq = Axios.get(`https://api.cognitive.microsoft.com/bing/v5.0/search?q=${searchText}`,
    {
      headers: { 'Ocp-Apim-Subscription-Key': bingKey }
    });

  if (state.searchEngine === 'google') {
    googleReq.then(data => {
      dispatch(receiveSearch(data.data.items));
    })
  } else if (state.searchEngine === 'bing') {
    bingReq.then(data => {
      console.log(data);

      dispatch(receiveSearch(data.data.webPages.value.map(x => {
        return { title: x.name, htmlSnippet: x.snippet, link: x.url, displayLink: x.displayUrl }
      })));
    });
  } else if (state.searchEngine === 'both') {
    Promise.all([bingReq, googleReq]).then(values => {
      let bingData = values[0].data.webPages.value.map(x => {
        return { title: x.name, htmlSnippet: x.snippet, link: x.url, displayLink: x.url }
      });
      let googleData = values[1].data.items;

      let joinData = {};

      googleData.forEach(x => {
        joinData[x.link] = Object.assign({}, x, { count: 1 })
      });

      bingData.forEach(x => {
        if (joinData[x.link]) {
          joinData[x.link] = Object.assign({}, joinData[x.link], { count: joinData[x.link].count + 1 })
        } else {
          joinData[x.link] = Object.assign({}, joinData[x.link], { count: 1 })
        }
      });
      dispatch(receiveSearch(Object.values(joinData)));
    })
  }
}

function getSongs() {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://api-stg.jam-community.com/song/trending'

  return fetch(proxyUrl + targetUrl)
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchSongs() {
  return dispatch => {
    dispatch(fetchSongsBegin());
    return getSongs()
      .then(json => {
        dispatch(fetchSongsSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchSongsFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_SONGS_BEGIN = 'FETCH_SONGS_BEGIN';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';

export const fetchSongsBegin = () => ({
  type: FETCH_SONGS_BEGIN,
});

export const fetchSongsSuccess = songs => ({
  type: FETCH_SONGS_SUCCESS,
  payload: { songs },
});

export const fetchSongsFailure = error => ({
  type: FETCH_SONGS_FAILURE,
  payload: { error },
});

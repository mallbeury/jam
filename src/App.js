import React from 'react';
import SongList from './components/SongList';

const SONG_FEED = 'https://cors-anywhere.herokuapp.com/https://api-stg.jam-community.com/song/trending'

function App() {
  return (
    <div className="App">
      <SongList strURL={SONG_FEED} />
    </div>
  );
}

export default App;

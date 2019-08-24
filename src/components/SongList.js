import React from 'react';
import { connect } from 'react-redux';
import { fetchSongs } from '../actions/songActions';
import SongListPaginationActionsTable from './SongListPaginationActionsTable';

class SongList extends React.Component {
  componentDidMount() {
    this.props.fetchSongs(this.props.strURL);
  }

  render() {
    const { error, loading, songs } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <SongListPaginationActionsTable songs={songs}>
      </SongListPaginationActionsTable>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSongs: (strURL) => dispatch(fetchSongs(strURL))
  }
};

const mapStateToProps = state => ({
  songs: state.songs.items,
  loading: state.songs.loading,
  error: state.songs.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(SongList);

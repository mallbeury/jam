import React from 'react';
import { connect } from 'react-redux';
import { fetchSongs } from '../actions/songActions';
import CustomPaginationActionsTable from './CustomPaginationActionsTable';

class SongList extends React.Component {
  componentDidMount() {
    this.props.fetchSongs();
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
      <CustomPaginationActionsTable songs={songs}>
      </CustomPaginationActionsTable>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSongs: () => dispatch(fetchSongs())
  }
};

const mapStateToProps = state => ({
  songs: state.songs.items,
  loading: state.songs.loading,
  error: state.songs.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(SongList);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SongCtrls from './SongCtrls';

const styles = theme => ({
  image: {
    width: '100px'
  }
});

class Song extends React.Component {
  handleSongPlay = () => {
    this.props.onHandleSongPlay(this.props.song.id);
  };

  handleSongPause = () => {
    this.props.onHandleSongPause();
  };

  handleLike = () => {
    this.props.onHandleSongLike(this.props.song.id);
  };

  render(){
    const { classes } = this.props;
    const pluralLikes = this.props.song.likes > 1;

    return (
      <TableRow>
        <TableCell>
        <img className={classes.image} alt={this.props.song.artist.description} src={this.props.song.cover_image_path} />
        </TableCell>
        <TableCell>{this.props.song.name} by {this.props.song.artist.artist_name}</TableCell>
        <TableCell align="right">
          <SongCtrls playing={this.props.playing} onHandleSongPlay={this.handleSongPlay} onHandleSongPause={this.handleSongPause} />
          <IconButton
            color='secondary'
            aria-label='Like'
            onClick={this.handleLike}
            >
            <FavoriteIcon />
          </IconButton> {this.props.song.likes} like{ pluralLikes ? 's' : '' }
        </TableCell>
      </TableRow>
    )
  }
}

Song.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Song);
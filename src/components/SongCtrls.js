import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import PauseIcon from '@material-ui/icons/PauseCircleOutline';

class SongCtrls extends React.Component {
  handleToggle = () => {
    let playing = !this.props.playing;

    if (playing) {
      this.props.onHandleSongPlay();
    }
    else {
      this.props.onHandleSongPause();
    }
  };

  render(){
    let icon;

    if (this.props.playing) {
      icon = <PauseIcon />;
    } else {
      icon = <PlayIcon />;
    }    

    return (
      <IconButton
        color='secondary'
        aria-label='Play'
        onClick={this.handleToggle}
        >
        {icon}
      </IconButton>
    )
  }
}

export default SongCtrls;
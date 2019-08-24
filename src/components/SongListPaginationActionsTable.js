import React from 'react';
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import Song from './Song';

const useStylesActions = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStylesActions();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStylesTable = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  }
}));

export default function SongListPaginationActionsTable(props) {
  const classes = useStylesTable();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [songPlaying, setSongPlaying] = React.useState(false);
  const [activeSongID, setActiveSongID] = React.useState(null);
  const [activeSongURL, setActiveSongURL] = React.useState(null);
  const [tickleRender, setTickleRender] = React.useState(0);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.songs.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleSongPlay(songID) {
    var foundSong = props.songs.find(function(song) {      
      return song.id === songID;
    });

    setActiveSongID(foundSong.id);
    setActiveSongURL(foundSong.music_file_path);
    setSongPlaying(true);
  }

  function handleSongPause() {
    setActiveSongID(null);
    setActiveSongURL(null);
    setSongPlaying(false);
  }

  function handleSongLike(songID) {
    var foundSong = props.songs.find(function(song) {
      return song.id === songID;
    });

    // we're setting a prop so need to simluate a state change to force render
    foundSong.likes = foundSong.likes + 1;

    setTickleRender(tickleRender+1);
  }

  return (    
    <div>
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>    
          <TableBody>
            {props.songs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(song => (
              <Song key={song.id} song={song} playing={song.id === activeSongID} onHandleSongPlay={handleSongPlay} onHandleSongPause={handleSongPause} onHandleSongLike={handleSongLike} />
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={props.songs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>

   <ReactPlayer url={activeSongURL} playing={songPlaying} controls width={0} height={0} />
   </div>
  );
}
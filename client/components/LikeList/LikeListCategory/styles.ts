import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: 15,
    margin: 0,
    display: 'flex',
    overflowX: 'auto',
    listStyle: 'none',
    whiteSpace: 'nowrap',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  container: {
    padding: '0 10px',
  },
  label: {
    marginRight: 15,
  },
});

export default useStyles;

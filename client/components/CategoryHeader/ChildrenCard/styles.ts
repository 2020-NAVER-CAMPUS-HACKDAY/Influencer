import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    backgroundColor: '#fff',
    minWidth: '100%',
    height: '3rem',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  cardContent: {
    display: 'flex',
    padding: '0 11px',
    whiteSpace: 'nowrap',
  },
  text: {
    width: '100%',
  },
});

export default useStyles;

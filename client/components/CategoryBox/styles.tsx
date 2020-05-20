import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  inactive: {
    background: 'grey',
    width: '7rem',
    height: '7rem',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  },
  active: {
    background: 'yellow',
    width: '7rem',
    height: '7rem',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  },
});

export default useStyles;

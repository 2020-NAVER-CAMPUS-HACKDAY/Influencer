import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    maxWidth: '375',
    padding: '0 0.5rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '5rem',
    justifyContent: 'center',
    margin: '0 0.3rem',
    width: '5rem',
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    font: '8rem',
    outline: 'inherit',
    whiteSpace: 'nowrap',
  },
  image: {
    height: '2.5rem',
    width: '2.5rem',
  },
});

export default useStyles;

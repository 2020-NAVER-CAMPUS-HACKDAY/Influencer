import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    padding: '0 0.5rem',
  },
  title: {
    margin: '0.7rem 0',
  },
  content: {
    display: 'flex',
    height: '17rem',
    justifyContent: 'center',
    maxWidth: '375px',
    width: '100%',
  },
  items: {
    alignItems: 'center',
    background: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: '0.5rem 0',
  },
  item: {
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

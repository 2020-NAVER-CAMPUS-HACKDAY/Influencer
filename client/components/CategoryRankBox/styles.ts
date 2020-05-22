import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gridItem: {
    padding: '10px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },

  gridItemContent: {
    width: '100px',
    height: '50px',
    boxSizing: 'border-box',
    background: '#08e',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Arial, Helvetica, sans-serif',
    alignItems: 'center',
  },

  rankNum: {
    position: 'relative',
    color: 'red',
    top: '10px',
    background: 'yellow',
    width: '20px',
    borderRadius: '50%',
    textAlign: 'center',
  },
});

export default useStyles;

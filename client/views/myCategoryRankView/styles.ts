import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    touchAction: 'none',
    width: '100%',
    margin: '1rem auto',
  },
  dropZone: {
    flex: 1,
    height: '600px',
  },
});

export default useStyles;

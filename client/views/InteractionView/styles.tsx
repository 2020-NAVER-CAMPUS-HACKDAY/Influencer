import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
  },
  swiper: {
    width: '100%',
    height: '100%',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  nextButton: {
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default useStyles;

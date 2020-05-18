import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: 1300,
    margin: '30px 0px',
  },
  loading: {
    width: '100%',
    maring: 10,
  },
  spinner: {
    margin: '0 auto',
    height: 40,
    width: 40,
    borderRadius: '50%',
    border: '4px solid rgba(0, 0, 0, 0)',
    borderTopColor: '#7396A5',
    animation: '$spinner 600ms linear infinite',
  },
  '@keyframes spinner': {
    '0%': {
      transform: 'rotate(360deg)',
    },
  },
});

export default useStyles;

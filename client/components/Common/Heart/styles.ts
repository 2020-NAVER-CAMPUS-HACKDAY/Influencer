import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    width: 22,
    height: 22,
    padding: 5,
    border: '1.5px solid rgba(180,180,180,.8)',
    borderRadius: '100%',
    boxShadow: '3px 3px 5px rgba(0,0,0,.1)',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  heart: {
    position: 'relative',
    width: 6.5,
    height: 6.5,
    background: 'rgba(180,180,180,.9)',
    transform: 'rotate(45deg) translate(2px,0px)',
    '&:before': {
      content: '""',
      width: '100%',
      height: '100%',
      background: 'rgba(180,180,180,.9)',
      position: 'absolute',
      top: '-53%',
      left: '0',
      borderRadius: '70%',
    },
    '&:after': {
      content: '""',
      width: '100%',
      height: '100%',
      background: 'rgba(180,180,180,.9)',
      position: 'absolute',
      bottom: '0',
      right: '53%',
      borderRadius: '70%',
    },
  },
});

export default useStyles;

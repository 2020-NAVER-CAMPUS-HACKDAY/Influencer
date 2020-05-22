import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    width: '140px',
  },
  next: {
    display: 'flex',
    alignItems: 'center',
    transform: 'rotate(-180deg)',
  },
});

export default useStyles;

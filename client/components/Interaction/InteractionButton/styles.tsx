import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  button: {
    backgroundColor: AppColor.GREEN,
    boxShadow: 'none',
    width: '140px',
    '&:hover': {
      backgroundColor: AppColor.GREEN,
      boxShadow: 'none',
    },
  },
  prev: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '7px',
  },
  next: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '7px',
    transform: 'rotate(-180deg)',
  },
});

export default useStyles;

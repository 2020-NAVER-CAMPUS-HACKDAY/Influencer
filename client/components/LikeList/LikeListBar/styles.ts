import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  root: {
    backgroundColor: AppColor.WHITE,
    height: '3.7rem',
  },
  rightPosition: {
    justifyContent: 'flex-end',
  },
});

export default useStyles;

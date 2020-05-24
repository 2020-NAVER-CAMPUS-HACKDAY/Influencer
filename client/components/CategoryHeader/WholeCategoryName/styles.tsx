import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  container: {
    background: AppColor.WHITE,
    display: 'flex',
    height: '3rem',
    color: 'black',
  },
  inactive: {
    color: AppColor.BLACK50,
  },
  active: {
    color: AppColor.BLACK,
  },
});

export default useStyles;

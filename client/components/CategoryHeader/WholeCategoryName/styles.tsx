import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  container: {
    background: AppColor.WHITE,
    display: 'flex',
    height: '2.5rem',
    color: 'black',
  },
  inactive: {
    color: AppColor.BLACK50,
  },
  active: {
    color: AppColor.BLACK,
  },
  button: {
    background: 'none',
    border: 'none',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
  },
});

export default useStyles;

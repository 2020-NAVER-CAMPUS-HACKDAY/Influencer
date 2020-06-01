import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  container: {
    background: AppColor.WHITE,
    display: 'flex',
    height: '2.5rem',
    color: 'black',
  },
  button: {
    background: 'none',
    border: 'none',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
  },
  inactive: {
    color: AppColor.BLACK50,
  },
  active: {
    color: AppColor.BLACK,
    fontWeight: 650,
  },
});

export default useStyles;

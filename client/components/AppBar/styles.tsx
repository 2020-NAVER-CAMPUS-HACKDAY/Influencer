import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  root: {
    backgroundImage: `linear-gradient(to right, ${AppColor.GREEN} , ${AppColor.PURPLE})`,
    position: 'fixed',
    zIndex: 2,
    boxShadow: 'none',
  },
  container: {
    padding: '0 1.5rem',
    display: 'flex',
    height: '3.5rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: 'Rajdhani',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '25px',
    color: AppColor.WHITE,
  },
  button: {
    background: 'none',
    border: 'none',
    outline: 'none',
  },
});

export default useStyles;

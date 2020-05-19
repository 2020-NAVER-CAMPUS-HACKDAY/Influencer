import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  button: {
    height: 35,
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: AppColor.WHITE,
    padding: 15,
  },
});

export default useStyles;

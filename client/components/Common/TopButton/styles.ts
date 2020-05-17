import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
    backgroundColor: AppColor.WHITE,
    position: 'relative',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
  },
});

export default useStyles;

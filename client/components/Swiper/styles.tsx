import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  card: {
    width: '300px',
    height: '300px',
    backgroundColor: AppColor.WHITE,
    border: '1px solid #EAEAEA',
    borderRadius: '10px',
  },
  product: {
    color: 'red',
  },
});

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
  },
  footer: {
    padding: '1rem',
  },
  product_image: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    borderBottom: `1px solid ${AppColor.GREY}`,
    '& img': {
      height: '100%',
    },
  },
  product_price: {
    fontSize: '1.1rem',
    fontWeight: 900,
  },
  product_name: {
    fontSize: '1rem',
    fontWeight: 500,
    marginTop: '10px',
    color: AppColor.BLACK50,
  },
});

export default useStyles;

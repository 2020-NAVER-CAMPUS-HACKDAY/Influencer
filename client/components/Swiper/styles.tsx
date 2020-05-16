import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  containerWrapper: {
    overflow: 'hidden',
    width: '100%',
    height: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px solid ${AppColor.WHITE}`,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  card: {
    width: '300px',
    height: '300px',
    backgroundColor: AppColor.WHITE,
    borderRadius: '7px',
    position: 'absolute',
    overflow: 'hidden',
    willChange: 'transform',
    transition: 'all 0.3s ease-in-out',
    cursor: 'grab',
  },
  card_moving: {
    transition: 'none',
    cursor: 'grabbing',
  },
});

export default useStyles;

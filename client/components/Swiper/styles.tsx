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
  action: {
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    '& span': {
      display: 'inline-block',
      padding: '7px 15px',
      margin: '20px',
      fontSize: '1.8rem',
      fontWeight: 600,
    },
  },
  action_good: {
    backgroundColor: 'rgba(255, 178, 217, 0.3)',
    '& span': {
      color: AppColor.RED,
      backgroundColor: 'rgba(255, 178, 217, 0.5)',
    },
  },
  action_bad: {
    backgroundColor: 'rgba(178, 204, 255, 0.3)',
    '& span': {
      color: AppColor.BLUE,
      backgroundColor: 'rgba(178, 204, 255, 0.5)',
    },
  },
});

export default useStyles;

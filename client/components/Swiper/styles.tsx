import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  containerWrapper: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: '200px', // 임시
  },
  card: {
    width: '300px',
    height: '300px',
    backgroundColor: AppColor.WHITE,
    border: `2px solid ${AppColor.PURPLE}`,
    borderRadius: '10px',
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
  temp: {
    position: 'fixed',
    top: '500px',
    left: '500px',
  },
});

export default useStyles;

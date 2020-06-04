import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  container: {
    backgroundColor: AppColor.GREY,
    minWidth: '100%',
    overflowX: 'scroll',
    height: '2.5rem',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  card: {
    display: 'inline-flex',
    height: '100%',
  },
  scroll: {

  },
  cardContent: {
    padding: '0 11px',
    whiteSpace: 'nowrap',
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    font: 'inherit',
    outline: 'inherit',
  },
  highLight: {
    color: AppColor.LIGHT_BLUE,
    fontWeight: 650,
  },
});

export default useStyles;

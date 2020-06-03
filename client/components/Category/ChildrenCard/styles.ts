import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  card: {
    backgroundColor: AppColor.GREY,
    display: 'flex',
    height: '2.5rem',
    minWidth: '100%',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
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

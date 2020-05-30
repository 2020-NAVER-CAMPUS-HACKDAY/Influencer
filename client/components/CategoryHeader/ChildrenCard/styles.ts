import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    backgroundColor: AppColor.GREY,
    minWidth: '100%',
    height: '2.5rem',
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
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
  },
});

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  container: {
    background: AppColor.WHITE,
    display: 'flex',
    color: 'black',
    height: '2.5rem',
    minWidth: '100%',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    font: 'inherit',
    outline: 'inherit',
    whiteSpace: 'nowrap',
  },
  inactive: {
    color: AppColor.BLACK50,
  },
  active: {
    color: AppColor.BLACK,
    fontWeight: 650,
  },
  separator: {
    color: AppColor.BLACK50,
    display: 'table',
    margin: 'auto 0',
  },
});

export default useStyles;

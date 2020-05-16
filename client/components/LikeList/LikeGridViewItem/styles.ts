import { makeStyles } from '@material-ui/core';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    position: 'relative',
    width: 130,
    marginTop: 20,
    marginBottom: 20,
    overflow: 'pre-wrap',
    lineHeight: '1px',
    backgroundColor: AppColor.WHITE,
  },
  data: {
    marginRight: 1,
    marginBottom: 1,
    background: AppColor.GREY,
  },
  content: {
    position: 'relative',
    display: 'flex',
    backgroundColor: AppColor.WHITE,
    padding: 10,
  },
});

export default useStyles;

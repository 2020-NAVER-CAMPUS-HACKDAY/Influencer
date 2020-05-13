import { makeStyles } from '@material-ui/core';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  root: {
    backgroundColor: AppColor.WHITE,
    height: 166,
    display: 'flex',
    paddingTop: 30,
    paddingBottom: 30,
  },
  spacing: {
    marginLeft: 24,
  },
  imageWrapper: {
    borderRadius: 20,
  },
  columnDirection: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: 'Noto Sans KR',
    display: 'inline-block',
    paddingBottom: 5,
  },
  size20: {
    fontSize: 20,
  },
  size15: {
    fontSize: 15,
  },
  productText: {
    minWidth: 170,
    fontWeight: 500,
  },
  productPrice: {
    fontWeight: 'bold',
  }
});

export default useStyles;

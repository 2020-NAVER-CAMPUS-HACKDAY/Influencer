import { makeStyles } from '@material-ui/core';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: AppColor.WHITE,
  },
  data: {
    marginRight: 1,
    marginBottom: 1,
    background: AppColor.GREY,
  },
  content: {
    backgroundColor: AppColor.WHITE,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 20,
  },
  images: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 25,
    lineHeight: '1px',
    minHeight: 160,
    maxWidth: 162,
  },
  marginLeft: {
    marginLeft: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  countLabel: {
    fontSize: 13,

  },
});

export default useStyles;

import { makeStyles } from '@material-ui/core';
import { AppColor } from 'constant';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
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
    paddingLeft: 20,
    paddingBottom: 20,
  },
  images: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 25,
    lineHeight: '1px',
    minHeight: 162,
    maxWidth: 162,
    minWidth: 162,
  },
  marginLeft: {
    marginLeft: 10,
  },
  label: {
    marginTop: 10,
    fontSize: '16px !important',
  },
  countLabel: {
    fontSize: 13,
  },
  wrapper: {
    margin: '0 !important',
  },
});

export default useStyles;

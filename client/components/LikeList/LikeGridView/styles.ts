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
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    display: 'flex',
  },
  images: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 25,
    lineHeight: '1px',
    minHeight: 160,
    maxWidth: 160,
    minWidth: 160,
  },
  marginX: {
    marginLeft: 10,
    marginRight: 10,
  },
  label: {
    marginTop: 10,
    fontSize: '16px !important',
  },
  countLabel: {
    fontSize: 13,

  },
});

export default useStyles;

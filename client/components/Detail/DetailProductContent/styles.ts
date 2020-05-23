import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  align: {
    alignItems: 'flex-start',
  },
  paddingTop: {
    paddingTop: 5,
  },
  priceBar: {
    justifyContent: 'flex-end',
  },
  productInfoBar: {
    padding: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  marginTop: {
    marginTop: 10,
  },
  marginLeft: {
    marginLeft: 5,
  },
  marginRight: {
    marginRight: 15,
  },
  productDetailBar: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    display: 'flex',
    paddingTop: 12,
    paddingBottom: 30,
  },
  productDetail: {
    paddingTop: 20,
    paddingLeft: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
  },
  image: {
    marginTop: '3.5rem',
  },
  shareButton: {
    width: 200,
  },
});

export default useStyles;

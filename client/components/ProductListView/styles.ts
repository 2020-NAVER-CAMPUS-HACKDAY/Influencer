import { makeStyles } from '@material-ui/core';
// import { AppColor } from 'constant';

const useStyles = makeStyles({
  card: {
    width: 200,
    height: 335,
  },
  cardPhoto: {
    width: 200,
    height: 250,
    overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 250,
  },
  cardDesc: {
    margin: 0,
    padding: 10,
  },
  name: {
    fontSize: 18,
    margin: 0,
  },
  company: {
    fontSize: 15,
    color: '#868e96',
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    color: '#ff8a3d',
    fontWeight: 600,
    marginTop: 4,
  },
});

export default useStyles;

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    width: 230,
    height: 375,
    margin: 0,
    padding: '25px 15px 10px 15px',
    borderRadius: 6,
    '&:hover': {
      boxShadow: '1px 1px 6px 2px rgba(0,0,0,.2)',
      color: '#4b77a6',
    },
  },
  cardPhoto: {
    width: 200,
    height: 250,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  image: {
    width: 200,
    height: 250,
  },
  cardDesc: {
    margin: 0,
    padding: 10,
  },
  title: {
    width: 200,
    display: 'flex',
  },
  name: {
    width: 152,
    marginRight: 8,
    fontSize: 18,
    margin: 0,
    cursor: 'pointer',
  },
  priceWrapper: {
    display: 'flex',
    color: 'black',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 18,
  },
  unit: {
    fontSize: 17,
    marginTop: 19.5,
    marginLeft: 3,
  },
});

export default useStyles;

import React from 'react';
import useStyles from 'components/TopButton/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import Label from 'components/Label';
import TopDirection from 'svgs/TopDirection';
import { AppColor } from 'constant';

const TopButton: React.FC = () => {
  const classes = useStyles();

  return (
    <MaterialAppBar className={classes.root} onClick={(): void => window.scrollTo(0, 0)}>
      <Label name={'TOP'} color={AppColor.BLACK} className={classes.label}/>
      <TopDirection />
    </MaterialAppBar>
  );
};

export default TopButton;

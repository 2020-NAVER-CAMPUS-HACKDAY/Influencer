import React, { FC } from 'react';
import Label from 'components/Common/Label';
import { AppColor } from 'constant';
import useStyles from './styles';

interface DetailInfoProps {
  column: string;
  value: string;
}

const DetailInfo: FC<DetailInfoProps> = (props) => {
  const classes = useStyles();
  const { column, value } = props;

  return (
    <div className={classes.productDetail}>
      <Label name={column} color={AppColor.BLACK50} fontSize={15}/>
      <div className={classes.marginRight}/>
      <Label name={value} color={AppColor.BLACK} fontSize={20}/>
    </div>
  );
};

export default DetailInfo;

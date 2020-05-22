import React, { FC, useState } from 'react';
import useStyles from 'components/CategoryHeader/WholeCategoryName/styles';

interface CategoryBoxProps {
  data: string;
}
const WholeCategoryName: FC<CategoryBoxProps> = (props) => {
  const { data } = props;
  const classes = useStyles();
  const nameArray = data.split('>');
  const lastIndex = nameArray.length - 1;

  const makeElement = (name, index) => (
    (index === lastIndex)
      ? <button className={classes.active}>{name}</button>
      : <button className={classes.inactive}>{name}</button>
  );

  return (
    <div className={classes.container}>
      {nameArray.map((name, index) => makeElement(name, index))}
    </div>
  );
};

export default WholeCategoryName;

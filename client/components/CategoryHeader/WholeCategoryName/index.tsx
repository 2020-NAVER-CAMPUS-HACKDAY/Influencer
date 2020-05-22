import React, { FC, useState } from 'react';
import useStyles from 'components/CategoryHeader/WholeCategoryName/styles';
import Router from 'next/router';

interface CategoryBoxProps {
  names: string;
  ids: string;
}
const WholeCategoryName: FC<CategoryBoxProps> = (props) => {
  const { names, ids } = props;
  const classes = useStyles();
  const nameArray = names.split('>');
  const idArray = ids.split('>');
  const lastIndex = nameArray.length - 1;

  const setCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const categoryId: string = event.currentTarget.value;
    Router.push(`/tempCategoryDetail/${categoryId}`);
  };

  const makeElement = (name, index) => (
    (index === lastIndex)
      ? <button className={classes.active} onClick={setCategory} value={idArray[index]}>
        {name}</button>
      : <button className={classes.inactive} onClick={setCategory} value={idArray[index]}>
        {name}</button>
  );

  return (
    <div className={classes.container}>
      {nameArray.map((name, index) => makeElement(name, index))}
    </div>
  );
};

export default WholeCategoryName;

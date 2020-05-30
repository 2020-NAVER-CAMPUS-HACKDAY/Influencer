import React, { FC } from 'react';
import useStyles from 'components/Category/WholeName/styles';
import Router from 'next/router';
import clsx from 'clsx';

interface CategoryBoxProps {
  names: string;
  ids: string;
}
const WholeName: FC<CategoryBoxProps> = (props) => {
  const { names, ids } = props;
  const classes = useStyles();
  const nameArray = names.split('>');
  const idArray = ids.split('>');
  const lastIndex = nameArray.length - 1;

  // TODO(jominjimail): duplicated function
  const setCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const categoryId: string = event.currentTarget.value;
    Router.push(`/tempCategoryDetail/${categoryId}`);
  };

  const makeElement = (name, index): React.ReactElement => (
    (index === lastIndex)
      ? <button
        key={index}
        className={clsx(classes.button, classes.active)}
        onClick={setCategory}
        value={idArray[index]}
      >
        {name}</button>
      : <button
        key={index}
        className={clsx(classes.button, classes.inactive)}
        onClick={setCategory}
        value={idArray[index]}
      >
        {name}</button>
  );

  return (
    <div className={classes.container}>
      {nameArray.map((name, index) => makeElement(name, index))}
    </div>
  );
};

export default WholeName;

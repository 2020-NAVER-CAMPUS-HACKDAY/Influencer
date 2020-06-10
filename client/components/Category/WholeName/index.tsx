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
  // TODO(jominjimail): remove this constant varialbe to constant.ts
  const SEPARATOR = '>';
  const nameArray = names.split(SEPARATOR);
  const idArray = ids.split(SEPARATOR);
  const lastIndex = nameArray.length - 1;

  // TODO(jominjimail): duplicated function
  const setCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const categoryId: string = event.currentTarget.value;
    Router.push(`/search/category?catId=${categoryId}`, undefined, { shallow: true });
  };

  const makeElement = (name, index): React.ReactElement => {
    const isLast = (index === lastIndex);
    return (
      <>
        <button
          key={index}
          className={clsx(classes.button, isLast ? classes.active : classes.inactive)}
          onClick={setCategory}
          value={idArray[index]}>
          {name}
        </button>
        {!isLast && <span className={classes.separator}>{SEPARATOR}</span>}
      </>
    );
  };

  return (
    <section className={classes.container}>
      {nameArray.map((name, index) => makeElement(name, index))}
    </section>
  );
};

export default WholeName;

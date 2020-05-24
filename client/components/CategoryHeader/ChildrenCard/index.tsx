import React, { FC } from 'react';
import useStyles from 'components/CategoryHeader/ChildrenCard/styles';
import Router from 'next/router';
import { Category } from 'interfaces/category';

interface ChildrenCardProps {
  childreanData: Category[];
}
const ChildrenCard: FC<ChildrenCardProps> = (props) => {
  const { childreanData } = props;
  const classes = useStyles();

  return (
    <section className={classes.card}>
      {childreanData.map((child, index) => (<button className={classes.cardContent}>
        {child.value.categoryName}
      </button>))}
    </section>
  );
};

export default ChildrenCard;

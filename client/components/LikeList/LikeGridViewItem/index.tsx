import React, { FC } from 'react';
import useStyles from 'components/LikeList/LikeGridViewItem/styles';
import { GridLayout } from '@egjs/react-infinitegrid';

const LikeGridViewItem: FC = (props) => {
  const classes = useStyles();

  return (
    <GridLayout className={classes.content}
      tag = 'div'
      layoutOptions={{
        align: 'center',
        margin: 20,
        itemSize: 160,
      }}
      options={{
        threshold: 200,
        isEqualSize: false,
        useFit: true,
        useRecycle: true,
        horizontal: false,
      }}
    >
      {props.children}
    </GridLayout>
  );
};

export default LikeGridViewItem;

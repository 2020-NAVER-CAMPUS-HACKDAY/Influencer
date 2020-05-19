import React, { useState, FC, ComponentType } from 'react';
import { GridLayout } from '@egjs/react-infinitegrid';
import Loading from 'components/Common/InfinityList/Loading';
import useStyles from 'components/Common/InfinityList/styles';

// TODO(minsoo): modify lint error
interface InfinityListProps {
  loadItems: () => Promise<any>;
  ItemComponent: ComponentType<any>;
}

const InfinityList: FC<InfinityListProps> = ({ ItemComponent, loadItems }) => {
  const classes = useStyles();

  const [list, setList] = useState<Array<ComponentType>>([]);
  const [start, setStart] = useState<number>(0);

  const onAppend = async ({ groupKey, startLoading }) => {
    startLoading();

    const res = await loadItems();
    const items = res.map((item, i) => (
      <ItemComponent groupKey={groupKey + 1} key={start + i} {...item} />
    ));

    setList([...list, items]);
    setStart(start + 30);
  };

  const onLayoutComplete = ({ isLayout, endLoading }) => {
    if (!isLayout) {
      endLoading();
    }
  };

  return (
    <section className={classes.container}>
      <GridLayout
        className={classes.wrapper}
        onAppend={onAppend}
        onLayoutComplete={onLayoutComplete}
        loading={<Loading />}
        layoutOptions={{
          margin: 16,
        }}
      >
        {list}
      </GridLayout>
    </section>
  );
};

export default InfinityList;

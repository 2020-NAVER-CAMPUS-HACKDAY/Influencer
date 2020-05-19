import React, {
  useState, FC, ComponentType, ReactElement,
} from 'react';
import { GridLayout } from '@egjs/react-infinitegrid';
import Loading from 'components/Common/InfinityList/Loading';
import useStyles from 'components/Common/InfinityList/styles';

// TODO(minsoo): modify interface
interface LoadItemsProps {
  groupKey: number;
  key: number;
}

// TODO(minsoo): modify lint error
interface InfinityListProps {
  loadItems: () => Promise<Array<LoadItemsProps>>;
  ItemComponent: ComponentType<object>;
}

const InfinityList: FC<InfinityListProps> = ({ ItemComponent, loadItems }) => {
  const classes = useStyles();

  // TODO(minsoo): modify type
  const [list, setList] = useState<Array<object>>([]);
  const [start, setStart] = useState<number>(0);

  const onAppend = async ({ groupKey, startLoading }): void => {
    startLoading();

    const res = await loadItems();
    const items = res.map((item, i): ReactElement => (
      <ItemComponent groupKey={groupKey + 1} key={start + i} {...item} />
    ));

    setList([...list, items]);
    setStart(start + 30);
  };

  const onLayoutComplete = ({ isLayout, endLoading }): void => {
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

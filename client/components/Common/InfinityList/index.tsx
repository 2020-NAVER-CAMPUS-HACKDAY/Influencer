import React, {
  useState, FC, ComponentType, ReactElement,
} from 'react';
import { GridLayout } from '@egjs/react-infinitegrid';
import Loading from 'components/Common/InfinityList/Loading';
import useStyles from 'components/Common/InfinityList/styles';

interface ItemProps {
  groupKey?: number;
}

interface InfinityListProps {
  loadItems: () => Promise<object[]>;
  ItemComponent: ComponentType<object | ItemProps>;
}

interface OnAppendParams {
  groupKey: number;
  startLoading: (loadingStyle?: object) => void;
}

interface OnLayoutCompleteParams {
  isLayout: boolean;
  endLoading: (loadginStyle?: object) => void;
}

const InfinityList: FC<InfinityListProps> = ({ ItemComponent, loadItems }) => {
  const classes = useStyles();

  const [list, setList] = useState<JSX.Element[]>([]);
  const [start, setStart] = useState<number>(0);

  const onAppend: (params: OnAppendParams) => Promise<void> = async ({
    groupKey,
    startLoading,
  }) => {
    startLoading();

    const res = await loadItems();
    const items = res.map((item, i): ReactElement => (
      <ItemComponent groupKey={groupKey + 1} key={start + i} {...item} />
    ));

    setList([...list].concat(items));
    setStart(start + 30);
  };

  const onLayoutComplete: (params: OnLayoutCompleteParams) => void = ({
    isLayout,
    endLoading,
  }) => {
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

import React from 'react';
import CategoryBox from 'components/CategoryBox';

interface Category{
  id: string;
  name: string;
}

interface SelectCategoryProp {
  dummyData: Category[];
  categoryAddHandler: (key: string) => void;
}

const SelectCategory: React.FunctionComponent<SelectCategoryProp> = (props) => {
  const { dummyData, categoryAddHandler } = props;

  const categoryElements = dummyData.map((data) => {
    const { id, name } = data;

    return (
      <CategoryBox
        key={id}
        id={id}
        name={name}
        categoryAddHandler={categoryAddHandler}
      />
    );
  });

  return (
    <>
      <div>{categoryElements}</div>
    </>
  );
};

export default SelectCategory;

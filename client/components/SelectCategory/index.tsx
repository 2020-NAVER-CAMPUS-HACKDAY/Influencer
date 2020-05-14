import React from 'react';
import CategoryBox from 'components/CategoryBox';

interface Category{
  id: string;
  name: string;
}

interface SelectCategoryProp {
  dummyData: Category[];
  categoryAddHandler: (id: string, name: string) => void;
  categoryDeleteHandler: (id: string) => void;
}

const SelectCategory: React.FunctionComponent<SelectCategoryProp> = (props) => {
  const { dummyData, categoryAddHandler, categoryDeleteHandler } = props;

  const categoryElements = dummyData.map((data) => {
    const { id, name } = data;
    return (
      <CategoryBox
        key={id}
        id={id}
        name={name}
        categoryAddHandler={categoryAddHandler}
        categoryDeleteHandler={categoryDeleteHandler}
      />
    );
  });

  return (
    <>
      {categoryElements}
    </>
  );
};

export default SelectCategory;

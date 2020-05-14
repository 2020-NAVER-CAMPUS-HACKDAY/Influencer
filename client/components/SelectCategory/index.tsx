import React from 'react';

interface Category{
  id: string;
  name: string;
}

interface SelectCategoryProp {
  dummyData: Category[];
  categoryAddHandler: () => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SelectCategory: React.FunctionComponent<SelectCategoryProp> = (props) => {
  const { dummyData } = props;
  const categoryElements = dummyData.map((data) => {
    const { id, name } = data;

    return (
      <div key={id}>{name}</div>
    );
  });

  return (
    <>
    {categoryElements}
    </>
  );
};

export default SelectCategory;

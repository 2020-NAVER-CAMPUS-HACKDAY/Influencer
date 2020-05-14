import React from 'react';

interface Category{
  id: string;
  name: string;
}

interface SelectCategoryProp {
  dummyData: Category[];
  categoryAddHandler: (key: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SelectCategory: React.FunctionComponent<SelectCategoryProp> = (props) => {
  const { dummyData, categoryAddHandler } = props;
  const categoryElements = dummyData.map((data) => {
    const { id, name } = data;

    return (
      <div key={id}>{name}</div>
    );
  });

  return (
    <>
      {categoryElements}
      <button onClick={categoryAddHandler('1string')} >👏</button>
    </>
  );
};

export default SelectCategory;

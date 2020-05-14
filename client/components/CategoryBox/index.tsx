import React, { useState } from 'react';

interface CategoryBoxProps {
  id: string;
  name: string;
  categoryAddHandler: (key: string) => void;
  categoryDeleteHandler: (key: string) => void;
}
const CategoryBox: React.FunctionComponent<CategoryBoxProps> = (props) => {
  const {
    id, name, categoryAddHandler, categoryDeleteHandler,
  } = props;
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    if (checked === true) {
      setChecked(false);
      categoryDeleteHandler(id);
    } else {
      setChecked(true);
      categoryAddHandler(id);
    }
  };

  return (
    <button key={id} onClick={toggleChecked}>{`${id}/${name}`}</button>
  );
};

export default CategoryBox;

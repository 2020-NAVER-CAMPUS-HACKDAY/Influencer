import React, { useState } from 'react';
import useStyles from 'components/CategoryBox/styles';

interface CategoryBoxProps {
  id: string;
  name: string;
  categoryAddHandler: (id: string, name: string) => void;
  categoryDeleteHandler: (id: string) => void;
}
const CategoryBox: React.FunctionComponent<CategoryBoxProps> = (props) => {
  const {
    id, name, categoryAddHandler, categoryDeleteHandler,
  } = props;
  const [checked, setChecked] = useState(false);
  const classes = useStyles();

  const toggleChecked = () => {
    if (checked) {
      setChecked(false);
      categoryDeleteHandler(id);
    } else {
      setChecked(true);
      categoryAddHandler(id, name);
    }
  };

  return (
    <div>
      <button key={id} onClick={toggleChecked} className={classes.button}>
        {`${id}/${name}`}
      </button>
    </div>
  );
};

export default CategoryBox;

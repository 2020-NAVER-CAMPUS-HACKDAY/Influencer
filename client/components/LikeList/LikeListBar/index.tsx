import React, { useState } from 'react';
import useStyles from 'components/LikeList/LikeListBar/styles';
import AppBar from 'components/Common/AppBar';
import SVGButton from 'components/Common/SVGButton';
import ClickedGrid from 'svgs/ClickedGrid';
import ClickedList from 'svgs/ClickedList';
import UnclickedGrid from 'svgs/UnclickedGrid';
import UnclickedList from 'svgs/UnclickedList';
import { AppColor } from 'constant';
import Label from 'components/Common/Label';

const LikeListBar: React.FC = () => {
  const classes = useStyles();
  const [listClicked, setListClicked] = useState(true);
  const [gridClicked, setGridClicked] = useState(false);

  const handleListClicked = (): void => {
    if (!listClicked && gridClicked) {
      setListClicked(true);
      setGridClicked(false);
    }
  };
  const handleGridClicked = (): void => {
    if (listClicked && !gridClicked) {
      setListClicked(false);
      setGridClicked(true);
    }
  };
  return (
    <div className={classes.marginBottom}>
      <AppBar height={'3.7rem'} backgroundColor={AppColor.WHITE} isNotFixed>
        <Label name={'찜한 상품'} color={AppColor.BLACK} fontSize={20}/>
        <div className={classes.rightPosition}>
          <SVGButton handleClick={handleListClicked}>
            { listClicked ? <ClickedList /> : <UnclickedList /> }
          </SVGButton>
          <SVGButton handleClick={handleGridClicked}>
            { gridClicked ? <ClickedGrid /> : <UnclickedGrid /> }
          </SVGButton>
        </div>
      </AppBar>
    </div>
  );
};

export default LikeListBar;

import React, { useState } from 'react';
import useStyles from 'components/LikeListBar/styles';
import AppBar from 'components/AppBar';
import SVGButton from 'components/SVGButton';
import ClickedGrid from 'svgs/ClickedGrid';
import ClickedList from 'svgs/ClickedList';
import UnclickedGrid from 'svgs/UnclickedGrid';
import UnclickedList from 'svgs/UnclickedList';
import { AppColor } from 'constant';
import Logo from 'components/Logo';

const LikeListBar: React.FC = () => {
  const classes = useStyles();
  const [listClicked, setListClicked] = useState(true);
  const [gridClicked, setGridClicked] = useState(false);

  const handleListClicked = () => {
      if (!listClicked && gridClicked){
        setListClicked(true);
        setGridClicked(false);
    }
  }
  const handleGridClicked = () => {
    if (listClicked && !gridClicked){
        setListClicked(false);
        setGridClicked(true);
    }
  }
  return(
      <AppBar height={'3.7rem'} backgroundColor={AppColor.WHITE} isNotFixed>
        <Logo pageName={'찜한 상품'} color={AppColor.BLACK}/>
        <div className={classes.rightPosition}>
          <SVGButton handleClick={handleListClicked}>
            { listClicked ? <ClickedList /> : <UnclickedList /> }
          </SVGButton>
          <SVGButton handleClick={handleGridClicked}>
            { gridClicked ? <ClickedGrid /> : <UnclickedGrid /> }
          </SVGButton>
        </div>
      </AppBar>
  )
}

export default LikeListBar;
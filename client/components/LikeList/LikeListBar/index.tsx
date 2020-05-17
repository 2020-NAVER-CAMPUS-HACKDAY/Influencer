import React, {FC} from 'react';
import useStyles from 'components/LikeList/LikeListBar/styles';
import AppBar from 'components/Common/AppBar';
import SVGButton from 'components/Common/SVGButton';
import ClickedGrid from 'svgs/ClickedGrid';
import ClickedList from 'svgs/ClickedList';
import UnclickedGrid from 'svgs/UnclickedGrid';
import UnclickedList from 'svgs/UnclickedList';
import Label from 'components/Common/Label';
import LikeListBarProps from 'components/LikeList/LikeListBar/interface';
import { AppColor } from 'constant';

const LikeListBar: FC<LikeListBarProps> = (props) => {
  const classes = useStyles();
  const {
    listClicked,
    handleGridClicked,
    gridClicked,
    handleListClicked,
  } = props;

  return (
    <div>
      <AppBar className={classes.root} isNotFixed>
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

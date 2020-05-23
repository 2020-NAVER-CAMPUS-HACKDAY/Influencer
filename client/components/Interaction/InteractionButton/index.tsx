import React, { FC } from 'react';
import Router from 'next/router';
import InteractionButtonProps from 'components/Interaction/InteractionButton/interface';
import useStyles from 'components/Interaction/InteractionButton/styles';
import { withStyles } from '@material-ui/core/styles';
import { AppColor } from 'constant';
import Button from '@material-ui/core/Button';
import Label from 'components/Common/Label';
import Direction from 'svgs/Direction';

const StyledButton = withStyles({
  root: {
    background: AppColor.GREEN,
    boxShadow: 'none',
    border: 0,
    width: '140px',
    '&:hover': {
      background: AppColor.GREEN,
      boxShadow: 'none',
      border: 0,
    },
  },
})(Button);

const InteractionButton: FC<InteractionButtonProps> = (props) => {
  const classes = useStyles();
  const {
    category, categoryIndex, isPrev, handleClick,
  } = props;

  return (
    <div className={classes.wrapper}>
      {category
      && <StyledButton
        variant='contained'
        size='small'
        startIcon={isPrev && <Direction />}
        endIcon={isPrev === false && <div className={classes.next}><Direction /></div>}
        disabled={isPrev === undefined}
        onClick={(): void => handleClick(categoryIndex)}>
        <Label name={category.value.categoryName} fontSize={22} color={AppColor.WHITE} />
      </StyledButton>}

      {(!category && isPrev === false)
      && <StyledButton
        variant='contained'
        size='small'
        onClick={(): Promise<boolean> => Router.push('/my/category')}>
        <Label name='끝내기' fontSize={22} color={AppColor.WHITE} />
      </StyledButton>}
    </div>
  );
};

export default (InteractionButton);

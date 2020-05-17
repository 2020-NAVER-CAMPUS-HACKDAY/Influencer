import React from 'react';
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

const InteractionButton: React.FC<InteractionButtonProps> = (props) => {
  const classes = useStyles();
  const { categoryName, isPrev } = props;

  return (
    <StyledButton
      variant='contained'
      size='small'
      disabled={isPrev}>
      {isPrev && (
        <div className={classes.prev}>
          <Direction />
        </div>)}
      <Label name={categoryName} fontSize={22} color={AppColor.WHITE} />
      {!isPrev && (
        <div className={classes.next}>
          <Direction />
        </div>)}
    </StyledButton>
  );
};

export default (InteractionButton);

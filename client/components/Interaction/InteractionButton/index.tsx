import React from 'react';
import useStyles from 'components/Interaction/InteractionButton/styles';
import Button from '@material-ui/core/Button';
import Label from 'components/Label';
import Direction from 'svgs/Direction';
import { AppColor } from 'constant';

interface InteractionButtonProps {
  categoryName: string;
  isPrev: boolean;
}

const InteractionButton: React.FC<InteractionButtonProps> = (props) => {
  const classes = useStyles();
  const { categoryName, isPrev } = props;

  return (
    <>
      <Button
        variant='contained'
        size='small'
        disabled={isPrev}
        className={classes.button}>
        {isPrev
          ? <div className={classes.prev}>
            <Direction />
          </div>
          : null}
        <Label name={categoryName} fontSize={22} color={AppColor.WHITE} />
        {!isPrev
          ? <div className={classes.next}>
            <Direction />
          </div>
          : null}
      </Button>
    </>
  );
};

export default InteractionButton;

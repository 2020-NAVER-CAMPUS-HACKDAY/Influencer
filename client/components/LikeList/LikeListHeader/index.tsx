import React, { FC } from 'react';
import AppBar from 'components/Common/AppBar';
import { AppColor } from 'constant';
import Label from 'components/Common/Label';
import useStyles from 'components/LikeList/LikeListItem/styles';
import Link from 'next/link';

const LikeListHeader: FC = () => {
  const classes = useStyles();

  return (
    <Link href={'/'}>
      <a className={classes.link}>
        <AppBar className={classes.header}
          backgroundImage={AppColor.MAIN_HEADER}
          isNotFixed
        >
          <Label name='쇼핑MY'/>
        </AppBar>
      </a>
    </Link>
  );
};

export default LikeListHeader;

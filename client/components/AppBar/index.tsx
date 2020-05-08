import React from 'react';
import useStyles from 'components/AppBar/styles';
import MaterialAppBar from '@material-ui/core/AppBar';

interface AppBarProps {
  children?: React.ReactNode;
}

const AppBar: React.FunctionComponent<AppBarProps> = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  return (
  	<MaterialAppBar className={classes.root}>
			<div className={classes.container}>
				<div className={classes.logo}>
					INFLUENCER
				</div>
			</div>
  	</MaterialAppBar>
  );
};

export default AppBar;

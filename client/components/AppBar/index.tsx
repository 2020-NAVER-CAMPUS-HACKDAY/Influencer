import React from 'react';
import useStyles from 'components/AppBar/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import HamburgerMenu from 'svgs/HamburgerMenu';


const AppBar: React.FunctionComponent = (props) => {
  const classes = useStyles(props);

  return (
		<MaterialAppBar className={classes.root}>
			<div className={classes.container}>
				<div className={classes.logo}>
					INFLUENCER
				</div>
				<div>
					<button className={classes.button}>
						<HamburgerMenu />
					</button>
				</div>
			</div>
		</MaterialAppBar>
  );
};

export default AppBar;

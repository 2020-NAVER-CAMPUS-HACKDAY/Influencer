import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useStyles from 'views/defaultView/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserProps, UserMethods, AuthActions } from 'redux/ducks/auth';

interface DefaultProps extends UserProps, UserMethods {
  data: string;
}

const userData = { id: 'dgsda', thumbnail: 'dgsadg' };

const Home: React.FC<DefaultProps> = (props) => {
  const { data, setUser, user } = props;
  const classes = useStyles(props);
  const setUserData = (): void => setUser(userData);

  return (
    <>
      <Head>
        <title>Influencer</title>
      </Head>
      <div className={classes.root} onClick={setUserData}>
        This is Default Page.
      </div>
      <Link href="/routeExample/example1">
        <a>go to Next Page</a>
      </Link>
      {data}
    </>
  );
};

export default connect<UserProps, UserMethods, void>(
  (state: UserProps) => ({
    user: state.user,
  }),
  (dispatch) => ({
    setUser: bindActionCreators(AuthActions.setUser, dispatch),
  }),
)(Home);

import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserProps, UserMethods, AuthActions } from 'redux/ducks/auth';
import MainHeader from 'components/MainHeader';

interface DefaultProps extends UserProps, UserMethods {
  data: string;
}

const userData = { id: 'dgsda', thumbnail: 'dgsadg' };

const Home: React.FC<DefaultProps> = (props) => {
  const { data, setUser } = props;
  const setUserData = (): void => setUser(userData);
  return (
    <MainHeader>
      <div onClick={setUserData}>
        This is my Category setting page.
      </div>
      <Link href="/routeExample/example1">
        <a>go to Next Page</a>
      </Link>
      {data}
    </MainHeader>
  );
};

export default connect<UserProps, void>(
  (state: UserProps) => ({
    user: state.user,
  }),
  (dispatch) => ({
    setUser: bindActionCreators(AuthActions.setUser, dispatch),
  }),
)(Home);

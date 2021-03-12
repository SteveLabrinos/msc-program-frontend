import React, { Suspense, useCallback, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import FrontBuilder from './containers/FrontBuilder/FrontBuilder';
import { useSelector } from 'react-redux';
import { authSelector, checkAuth } from './containers/Auth/authSlice';
import { Redirect } from 'react-router-dom';
import Logout from './containers/Auth/SignOut';
import LoadingProgress from './components/UI/LoadingProgress/LoadingProgress';

const AnnouncementsBuilder = React.lazy(() => import(`./containers/AnnouncementsBuilder/AnnouncementsBuilder`));
const FullAnnouncement = React.lazy(() => import(`./containers/FullAnnouncement/FullAnnouncement`));
const Regulation = React.lazy(() => import(`./components/Regulation/Regulation`));
const Stuff = React.lazy(() => import(`./containers/Stuffs/Stuffs`));
const Courses = React.lazy(() => import(`./containers/Courses/Courses`));
const SignIn = React.lazy(() => import(`./containers/Auth/SignIn`));
const Users = React.lazy(() => import(`./containers/Users/Users`));
// const Error404 = React.lazy(() => import(`./components/Error404/Error404`));

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */


//  changed App router links to load different with authentication and authorization
//  Stavros Lamprinos on 12/3/2021.
function App(props) {
    const dispatch = useDispatch();

    const { token, role } = useSelector(authSelector);

    const onTryAutoSignUp = useCallback(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(()=> {
        onTryAutoSignUp();
    }, [onTryAutoSignUp]);

    let authRouting;

    if (!token) {
      authRouting = <Switch>
          <Route path="/sign-in" render={props => <SignIn { ...props }/>} />
          <Route path="/announcements/:anId" render={props => <FullAnnouncement { ...props }/>} />
          <Route path="/announcements" render={props => <AnnouncementsBuilder { ...props }/>} />
          <Route path="/regulation" render={props => <Regulation { ...props }/>} />
          <Route path="/stuff/:type" render={props => <Stuff { ...props }/>} />
          <Route path="/courses" render={props => <Courses { ...props }/>} />
          <Route path="/" exact render={props => <FrontBuilder { ...props }/>} />
          <Redirect to="/" />
      </Switch>
  } else {
      switch (role) {
          case 'TEACHER':
              authRouting = <Switch>
                  <Route path="/sign-out" component={Logout} />
                  <Route path="/announcements/:anId" render={props => <FullAnnouncement { ...props }/>} />
                  <Route path="/announcements" render={props => <AnnouncementsBuilder { ...props }/>} />
                  <Route path="/regulation" render={props => <Regulation { ...props }/>} />
                  <Route path="/stuff/:type" render={props => <Stuff { ...props }/>} />
                  <Route path="/courses" render={props => <Courses { ...props }/>} />
                  <Route path="/" exact render={props => <FrontBuilder { ...props }/>} />
                  <Redirect to="/" />
              </Switch>;
            break;
          case 'STUFF':
              authRouting = <Switch>
                  <Route path="/sign-out" component={Logout} />
                  <Route path="/announcements/:anId" render={props => <FullAnnouncement { ...props }/>} />
                  <Route path="/announcements" render={props => <AnnouncementsBuilder { ...props }/>} />
                  <Route path="/regulation" render={props => <Regulation { ...props }/>} />
                  <Route path="/stuff/:type" render={props => <Stuff { ...props }/>} />
                  <Route path="/courses" render={props => <Courses { ...props }/>} />
                  <Route path="/users" render={props => <Users token={token} { ...props }/>} />
                  <Route path="/" exact render={props => <FrontBuilder { ...props }/>} />
                  <Redirect to="/" />
              </Switch>;
              break;
          case 'STUDENT':
              authRouting = <Switch>
                  <Route path="/sign-out" component={Logout} />
                  <Route path="/announcements/:anId" render={props => <FullAnnouncement { ...props }/>} />
                  <Route path="/announcements" render={props => <AnnouncementsBuilder { ...props }/>} />
                  <Route path="/regulation" render={props => <Regulation { ...props }/>} />
                  <Route path="/stuff/:type" render={props => <Stuff { ...props }/>} />
                  <Route path="/courses" render={props => <Courses { ...props }/>} />
                  <Route path="/" exact render={props => <FrontBuilder { ...props }/>} />
                  <Redirect to="/" />
              </Switch>;
              break;
          default:
              authRouting = null;
      }
  }

  return (
    <React.Fragment>
      <Layout token={token} {...props}>
          <Suspense fallback={ <LoadingProgress /> } >{ authRouting }</Suspense>
      </Layout>
    </React.Fragment>
  );
}

export default App;

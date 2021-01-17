import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import FrontBuilder from './containers/FrontBuilder/FrontBuilder';

const AnnouncementsBuilder = React.lazy(() => import(`./containers/AnnouncementsBuilder/AnnouncementsBuilder`));
const FullAnnouncement = React.lazy(() => import(`./containers/FullAnnouncement/FullAnnouncement`));
const Regulation = React.lazy(() => import(`./components/Regulation/Regulation`));

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

function App() {
  return (
    <div>
      <Layout>
          <Switch>
              <Route path="/" exact component={ FrontBuilder } />
              <Route path="/announcements/:anId" render={props => (
                  <Suspense fallback={ <Spinner /> }>
                      <FullAnnouncement {...props} />
                  </Suspense>
              )} />
              <Route path="/announcements" render={props => (
                  <Suspense fallback={ <Spinner /> }>
                      <AnnouncementsBuilder {...props} />
                  </Suspense>
              )} />
              <Route path="/regulation" render={() => (
                  <Suspense fallback={ <Spinner /> }>
                      <Regulation />
                  </Suspense>
              )} />
          </Switch>
      </Layout>
    </div>
  );
}

export default App;

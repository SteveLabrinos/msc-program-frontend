import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import FrontBuilder from './containers/FrontBuilder/FrontBuilder';

// import Spinner from './components/UI/Spinner/Spinner';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 13/1/2021.
 */

function App() {
  return (
    <div>
      <Layout>
          <Switch>
              <Route path="/" exact component={FrontBuilder}/>
          </Switch>
      </Layout>
    </div>
  );
}

export default App;

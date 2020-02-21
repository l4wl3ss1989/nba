import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/shared/Header/Header';
import Footer from './components/shared/Footer/Footer';

const Routes = () => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route to="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
  </>
);

export default Routes;

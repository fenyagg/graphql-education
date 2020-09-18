import { Link } from '@material-ui/core';
import { LazyQuery } from 'components/lazyQuery';
import { Query } from 'components/query';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import React from 'react';

enum Paths {
  QUERY = '/',
  LAZY = '/lazy',
}

function App() {
  return (
    <div
      className="App"
      style={{
        width: 500,
        margin: 'auto',
      }}
    >
      <Router>
        <nav style={{ marginBottom: 30 }}>
          <Link
            component={NavLink}
            to={Paths.QUERY}
            exact={true}
            style={{
              textDecoration: 'underline',
            }}
            activeStyle={{
              cursor: 'default',
              textDecoration: 'none',
            }}
          >
            Query
          </Link>
          &nbsp;&nbsp;
          <Link
            component={NavLink}
            to={Paths.LAZY}
            style={{
              textDecoration: 'underline',
            }}
            activeStyle={{
              cursor: 'default',
              textDecoration: 'none',
            }}
          >
            Lazy
          </Link>
        </nav>
        <Switch>
          <Route exact={true} path={Paths.QUERY}>
            <Query />
          </Route>
          <Route exact={true} path={Paths.LAZY}>
            <LazyQuery />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

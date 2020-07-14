import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.scss';

import Home from '../components/pages/Home/Home';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }}/>);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <Router>
          <Switch>
            <PublicRoute path="/" exact component={Home} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

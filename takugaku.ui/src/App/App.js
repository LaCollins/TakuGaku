import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';

import Home from '../components/pages/Home/Home';
import SchoolForm from '../components/pages/SchoolForm/SchoolForm';
import firebaseApp from '../helpers/data/connection';
import schoolData from '../helpers/data/schoolData';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

firebaseApp();

class App extends React.Component {
  state = {
    authed: false,
    uid: '',
    school: {},
    schoolExists: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.setState({ uid: user.uid });
        schoolData.getSchoolByUid(user.uid)
          .then((response) => {
            this.setState({ school: response });
            this.setState({ schoolExists: true });
          })
          .catch(() => {
            this.setState({ school: {} });
          });
      } else {
        this.setState({ authed: false });
        this.setState({ uid: '' });
        this.setState({ school: {} });
        this.setState({ schoolExists: false });
      }
    });
  }

  setSchool = (schoolData) => {
    this.setState({ school: schoolData });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const {
      authed,
      uid,
      school,
      schoolExists,
    } = this.state;

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props} authed={authed} uid={uid} school={school} />} />
            <Route path="/register/school" render={(props) => <SchoolForm {...props} authed={authed} uid={uid} school={school} schoolExists={schoolExists} setSchool={this.setSchool}/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

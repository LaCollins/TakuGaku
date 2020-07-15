import React from 'react';
import Button from 'react-bootstrap/Button';
import authData from '../../../helpers/data/authData';
import './Auth.scss';

class Auth extends React.Component {
    loginClickEvent = (e) => {
      e.preventDefault();
      authData.loginUser();
    }

    render() {
      return (
            <div className="Auth">
                <Button variant="secondary" className="signIn mainPgButton" onClick={this.loginClickEvent}>Sign In</Button>
            </div>
      );
    }
}

export default Auth;

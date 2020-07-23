import React from 'react';
import apiGoogleConfig from '../../../helpers/credentials.json';
import './Calendar.scss';

const Config = apiGoogleConfig.web;

class Calendar extends React.Component {
    gapi = window.gapi;

    CLIENT_ID = Config.client_id;

    API_KEY = Config.apiKey;

    DISCOVERY_DOCS = Config.discoveryDocs;

    SCOPES = Config.scopes;

    handleClick = () => {
      this.gapi.load('client:auth2', () => {
        console.error('loaded client');

        this.gapi.client.init({
          apiKey: this.API_KEY,
          clientId: this.CLIENT_ID,
          discoveryDocs: this.DISCOVERY_DOCS,
          scope: this.SCOPES,
        });

        this.gapi.client.load('calendar', 'v3', (calendar) => console.error(calendar));

        this.gapi.auth2.getAuthInstance().signIn();
      });
    }

    render() {
      return (
            <div className="Calendar">
                <h1>Class Scheduler</h1>
                <button onClick={this.handleClick}>Test</button>
            </div>
      );
    }
}

export default Calendar;

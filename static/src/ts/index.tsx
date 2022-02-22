import Homepage from './views/Homepage';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Users from './access/Users';
import UINavigator from './models/UINavigator';
import GameplayOptions from './components/GameplayOptions';

ReactDOM.render(<Homepage />, document.getElementById('react-app-target'));

if (Users.hasCert()) {
    Users.authenticateCertificate()
        .then(() => {
            UINavigator.render(<GameplayOptions />);
        })
        .catch(err => {
            console.log(err);
        });
}

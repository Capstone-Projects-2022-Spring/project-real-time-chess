import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Users from './access/Users';
import GameplayOptions from './views/GameplayOptions';
import UINavigator from './models/UINavigator';
import Homepage from './views/Homepage';

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

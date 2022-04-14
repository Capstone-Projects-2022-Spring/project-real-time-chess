import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import Users from './access/Users';
import GameplayOptions from './views/GameplayOptions';
import UINavigator from './models/UINavigator';
import Homepage from './views/Homepage';
import WinstonViewer from './views/WinstonViewer';

ReactDOM.render(<Homepage />, document.getElementById('react-app-target'));

if (Users.hasCert()) {
    Users.authenticateCertificate()
        .then(() => {
            UINavigator.render(<GameplayOptions />);
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Account Error',
                text: 'It seems like you are not logged in. Please try logging in again',
            }).catch(err => document.write(`Error: ${err.message}`));
        });
}

Object.defineProperty(window, 'WinstonViewer', {
    value: () => {
        UINavigator.render(<WinstonViewer />);
    },
    writable: false,
});

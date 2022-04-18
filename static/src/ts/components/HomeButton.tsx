import { IonIcon } from '@ionic/react';
import { home } from 'ionicons/icons';
import React from 'react';
import UINavigator from '../models/UINavigator';
import MainMenu from '../views/MainMenu';

/**
 * A button which redirects back to the main menu.
 */
class HomeButton extends React.Component {
    /**
     * @returns The home button component
     */
    render() {
        return <IonIcon icon={home} onClick={() => UINavigator.render(<MainMenu />)} />;
    }
}

export default HomeButton;

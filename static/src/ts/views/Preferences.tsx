import { IonIcon } from '@ionic/react';
import {
    checkmarkCircle,
    checkmarkCircleOutline,
    colorPaletteOutline,
    contrastOutline,
} from 'ionicons/icons';
import React from 'react';
import CookieManager from '../access/CookieManager';
import ButtonComponent from '../components/UI/ButtonComponent';
import UINavigator from '../models/UINavigator';
import Homepage from './Homepage';
import MainMenu from './MainMenu';

/**
 * The preferences view. This should really only show up one time.
 */
class Preferences extends React.Component {
    /**
     * @returns The preferences component.
     */
    render() {
        return (
            <div
                className="container-fluid"
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <div>
                    <h1>Preferences</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IonIcon icon={colorPaletteOutline} size="large" />
                        Rainbow
                        <div style={{ flexGrow: '1' }}></div>
                        <IonIcon icon={checkmarkCircle} size="large" color="rgb(0, 255, 0)" />
                        Enabled
                    </div>
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IonIcon icon={contrastOutline} size="large" />
                        Dark Mode
                        <div style={{ flexGrow: '1' }}></div>
                        <IonIcon icon={checkmarkCircleOutline} size="large" />
                        Disabled
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <ButtonComponent
                            onClick={() => {
                                if (CookieManager.uid && CookieManager.auth) {
                                    UINavigator.render(<MainMenu />);
                                } else {
                                    UINavigator.render(<Homepage />);
                                }
                            }}
                        >
                            Close
                        </ButtonComponent>
                        &nbsp;
                        <ButtonComponent
                            onClick={() => {
                                if (CookieManager.uid && CookieManager.auth) {
                                    UINavigator.render(<MainMenu />);
                                } else {
                                    UINavigator.render(<Homepage />);
                                }
                            }}
                        >
                            Save
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        );
    }
}

export default Preferences;

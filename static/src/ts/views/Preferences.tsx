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

interface PreferencesState {
    rainbow: boolean;
    darkMode: boolean;
}

/**
 * The preferences view. This should really only show up one time.
 */
class Preferences extends React.Component<NoProps, PreferencesState> {
    /**
     * Creates an instance of Preferences.
     * @param props - Accepts no properties
     */
    constructor(props: NoProps) {
        super(props);
        this.state = {
            rainbow: CookieManager.getCookie('pref-rainbow') !== 'false',
            darkMode: CookieManager.getCookie('pref-darkmode') === 'true',
        };
    }

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
                        <IonIcon
                            icon={this.state.rainbow ? checkmarkCircle : checkmarkCircleOutline}
                            size="large"
                            color="rgb(0, 255, 0)"
                        />
                        {this.state.rainbow ? 'Enabled' : 'Disabled'}
                    </div>
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IonIcon icon={contrastOutline} size="large" />
                        Dark Mode
                        <div style={{ flexGrow: '1' }}></div>
                        <IonIcon
                            icon={this.state.darkMode ? checkmarkCircle : checkmarkCircleOutline}
                            size="large"
                        />
                        {this.state.darkMode ? 'Enabled' : 'Disabled'}
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
                                CookieManager.setCookie(
                                    'pref-rainbow',
                                    this.state.rainbow.toString(),
                                );
                                CookieManager.setCookie(
                                    'pref-darkmode',
                                    this.state.darkMode.toString(),
                                );
                                CookieManager.setCookie('pref-set', 'true');
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

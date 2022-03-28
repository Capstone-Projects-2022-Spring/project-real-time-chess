import * as React from 'react';
import { NoProps } from '../models/types';
import ButtonComponent from './ButtonComponent';

const one = '1';
const three = '3';
const five = '5';

/**
 * An interface for cooldown string.
 */
interface CooldownSelectorState {
    cooldown: string;
}

/**
 * CooldownSelectorComponent Class
 * This class has the option of three different cooldown times (in seconds).
 */
class CooldownSelectorComponent extends React.Component<NoProps, CooldownSelectorState> {
    /**
     * Constructor for CooldownSelectorComponent
     */
    constructor(props: NoProps) {
        super(props);
        this.state = { cooldown: '' };
        this.handleClickOne = this.handleClickOne.bind(this);
        this.handleClickThree = this.handleClickThree.bind(this);
        this.handleClickFive = this.handleClickFive.bind(this);
    }

    /**
     * Sets the cooldown state to one.
     */
    handleClickOne() {
        this.setState({ cooldown: one });
    }

    /**
     * Sets the cooldown state to three.
     */
    handleClickThree() {
        this.setState({ cooldown: three });
    }

    /**
     * Select the cooldown state to five.
     */
    handleClickFive() {
        this.setState({ cooldown: five });
    }

    /**
     * Method to render component.
     * @returns Buttons rendered to screen for cooldowntime.
     */
    render() {
        return (
            <div className='container'>
                <div className='container'>
                    <strong>Select the cooldown time</strong>
                </div>
                <div className='container'>
                <ButtonComponent
                    label="1s"
                    onClick={ this.handleClickOne }
                />
                <ButtonComponent
                    label="3s"
                    onClick={ this.handleClickThree }
                />
                <ButtonComponent
                    label="5s"
                    onClick={ this.handleClickFive }
                />
                </div>
            </div>
        );
    }
}

export default CooldownSelectorComponent;
export { CooldownSelectorState };

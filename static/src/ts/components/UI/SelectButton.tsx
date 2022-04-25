import { IonIcon } from '@ionic/react';
import { logoAndroid } from 'ionicons/icons';
import React from 'react';

interface SelectButtonProps {
    value: string;
    onClick: (value: string) => void;
    selected?: boolean;
    color?: string;
    textColor?: string;
}

/**
 * The component for a clickable button which changes a state until its changed again.
 */
class SelectButton extends React.Component<SelectButtonProps, NoState> {
    /**
     * @returns The JSX constructor for a select button.
     *
     */
    render() {
        return (
            <button
                className={`select-button-component ${
                    this.props.selected ? 'select-button-component-selected' : ''
                }`.trim()}
                onClick={() => this.props.onClick(this.props.value)}
                style={{
                    backgroundColor: this.props.color ?? '#fff',
                    color: this.props.textColor ?? '#000',
                    boxShadow: `0 0 1rem 0 ${this.props.color}`,
                }}
            >
                {this.props.selected
                    ? [<IonIcon icon={logoAndroid} />, <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>]
                    : null}
                {this.props.children}
            </button>
        );
    }
}

export default SelectButton;

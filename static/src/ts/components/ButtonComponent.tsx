import * as React from 'react';
import { NoState } from '../models/types';

/**
 * Interface for the properties of the ButtonComponent.
 */
interface ButtonComponentProps {
    label: string | JSX.Element;
    className?: string;
    width?: string;
    onClick: () => void;
}

/**
 * A react button component which allows for simple text and click functionality.
 */
class ButtonComponent extends React.Component<ButtonComponentProps, NoState> {
    /**
     * @returns A stylized button component which matches the RTC theme.
     */
    render() {
        return (
            <button
                className={`button-component ${this.props.className?.trim()}`.trim()}
                onClick={this.props.onClick}
                style={{ width: this.props.width ?? 'auto' }}
            >
                <div>{this.props.label}</div>
            </button>
        );
    }
}

export default ButtonComponent;
export { ButtonComponentProps };

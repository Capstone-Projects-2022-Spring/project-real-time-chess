import * as React from 'react';
import { NoState } from '../models/types';

/**
 * Interface for the properties of the ButtonComponent.
 */
interface ButtonComponentProps {
    label?: string | JSX.Element;
    className?: string;
    width?: string;
    onClick: () => void;
}

/**
 * A react button component which allows for simple text and click functionality.
 */
class ButtonComponent extends React.Component<ButtonComponentProps, NoState> {
    /**
     * Creates an instance of ButtonComponent.
     * @param props - The properties belonging to the button.
     * If the button contains the "label" prop, then this component must not have
     * any children. A violation of this rule will result in an error being thrown.
     */
    constructor(props: ButtonComponentProps) {
        super(props);
        if (props.label && this.props.children) {
            throw new Error('ButtonComponent cannot have both a label and children.');
        }
    }

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
                <div>
                    {this.props.children ? this.props.children : null}
                    {this.props.label ? this.props.label : null}
                </div>
            </button>
        );
    }
}

export default ButtonComponent;
export { ButtonComponentProps };

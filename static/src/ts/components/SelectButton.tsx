import React from 'react';

interface SelectButtonProps {
    value: string;
    onClick: (value: string) => void;
    selected?: boolean;
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
            >
                {this.props.children}
            </button>
        );
    }
}

export default SelectButton;

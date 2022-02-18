import * as React from 'react';

export interface ButtonComponentProps {
    label: string | JSX.Element;
    className?: string;
    onClick: () => void;
}

export default class ButtonComponent extends React.Component<ButtonComponentProps, {}> {
    constructor(props: ButtonComponentProps) {
        super(props);
    }

    render() {
        return (
            <button
                className={`button-component ${this.props.className?.trim()}`.trim()}
                onClick={this.props.onClick}
            >
                <div>{this.props.label}</div>
            </button>
        );
    }
}

import * as React from 'react';

export interface ButtonComponentProps {
    label: string | JSX.Element;
    className?: string;
}

export default class ButtonComponent extends React.Component<ButtonComponentProps> {
    constructor(props: ButtonComponentProps = { label: '' }) {
        super(props);
    }

    render() {
        return (
            <button className={`button-component ${this.props.className?.trim()}`.trim()}>
                <div>{this.props.label}</div>
            </button>
        );
    }
}

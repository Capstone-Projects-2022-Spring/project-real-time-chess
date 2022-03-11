import * as React from 'react';
import ButtonComponent from './ButtonComponent';

export interface PopupProps {
    title: string;
    text: string;
    buttons?: [ButtonComponent];
}

export default class Popup extends React.Component<PopupProps> {
    render() {
        return (
            <div className="popup">
                <div className="popup_inner">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.text}</p>
                    {this.props.buttons}
                </div>
            </div>
        );
    }
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ButtonComponent from './ButtonComponent';

export interface PopupProps {
    title: string;
    text: string;
    buttons?: [ButtonComponent];
}

export default class PopupComponent extends React.Component<PopupProps> {
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

    static show(popup: JSX.Element): void {
        const target = document.getElementById('react-overlay-target');
        ReactDOM.render(popup, target);
        target?.classList.add('active');
    }
}

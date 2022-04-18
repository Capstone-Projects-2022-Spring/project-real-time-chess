import { IonIcon } from '@ionic/react';
import React from 'react';

interface IconButtonProps {
    size?: string;
    prepend?: string;
    append?: string;
    icon: string;
    hoverIcon?: string;
    onClick: () => void;
}

interface IconButtonState {
    icon: string;
}

/**
 * A reusable icon button. This component allows for changing the
 * icon on hover.
 */
class IconButton extends React.Component<IconButtonProps, IconButtonState> {
    /**
     * Creates an instance of IconButton.
     *
     * @param props - Accepts props for the icon/hover icon
     * and onClick behavior.
     */
    constructor(props: IconButtonProps) {
        super(props);
        this.state = {
            icon: props.icon,
        };
    }

    /**
     * @returns The icon button.
     */
    render() {
        return (
            <button
                className="icon-button-component"
                onMouseOver={() => this.setState({ icon: this.props.hoverIcon ?? this.props.icon })}
                onMouseOut={() => this.setState({ icon: this.props.icon })}
                onClick={() => this.props.onClick()}
                style={{ fontSize: this.props.size }}
            >
                {this.props.prepend ? this.props.prepend : null}
                <IonIcon icon={this.state.icon} />
                {this.props.append ? this.props.append : null}
            </button>
        );
    }
}

export default IconButton;

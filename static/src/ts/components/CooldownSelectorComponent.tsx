import * as React from 'react';
// import { NoProps } from '../models/types';
// import ChessGame from './project-real-time-chess/src/main/ChessGame';
/**
 * An interface for cooldown string.
 */
interface CooldownSelectorState {
    value: number;
}

interface CooldownSelectorProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * CooldownSelectorComponent Class
 * This class has the option of three different cooldown times (in seconds).
 */
class CooldownSelectorComponent extends React.Component<
    CooldownSelectorProps,
    CooldownSelectorState
> {
    /**
     * Constructor for CooldownSelectorComponent
     */
    constructor(props: CooldownSelectorProps) {
        super(props);
        this.state = { value: 5 };
    }

    /**
     * Method to render component.
     * @returns Buttons rendered to screen for cooldowntime.
     */
    render() {
        return (
            <div style={{ background: 'white', borderRadius: '2rem', padding: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'gray' }}>
                    Cooldown Time:&nbsp;
                </div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={this.state.value}
                    onChange={e => {
                        console.log(`Cooldown ${+e.target.value}`);
                        this.setState({ value: +e.target.value });
                        this.props.onChange(e);
                    }}
                />
                <span style={{ paddingLeft: '1rem' }}>{this.state.value}s</span>
            </div>
        );
    }
}

export default CooldownSelectorComponent;

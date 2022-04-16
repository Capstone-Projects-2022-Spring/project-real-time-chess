import * as React from 'react';

/**
 * An interface for cooldown string.
 */
interface CooldownSelectorState {
    value: number;
}

/**
 * CooldownSelectorComponent Class
 * This class has the option of three different cooldown times (in seconds).
 */
class CooldownSelectorComponent extends React.Component<NoProps, CooldownSelectorState> {
    /**
     * Constructor for CooldownSelectorComponent
     */
    constructor(props: NoProps) {
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
                    onChange={e => this.setState({ value: +e.target.value })}
                />
                <span style={{ paddingLeft: '1rem' }}>{this.state.value}s</span>
            </div>
        );
    }
}

export default CooldownSelectorComponent;
export { CooldownSelectorState };

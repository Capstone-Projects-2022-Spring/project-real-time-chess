import * as React from 'react';

interface CooldownSelectorProps {
    value: number;
    onChange: (value: number) => void;
}

/**
 * CooldownSelectorComponent Class
 * This class has the option of three different cooldown times (in seconds).
 */
class CooldownSelectorComponent extends React.Component<CooldownSelectorProps> {
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
                    value={this.props.value}
                    onChange={e => this.props.onChange(+e.target.value)}
                />
                <span style={{ paddingLeft: '1rem' }}>{this.props.value}s</span>
            </div>
        );
    }
}

export default CooldownSelectorComponent;

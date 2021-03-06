import React from 'react';
import HomeButton from './HomeButton';

interface TitlebarProps {
    title: string;
}

/**
 * The titlebar which is displayed over most RTC screens.
 */
class Titlebar extends React.Component<TitlebarProps> {
    /**
     * @returns The tilebar component as defined.
     */
    render() {
        return (
            <div className="row primary-gradient hue-rotate p-2 text-light">
                <div className="col">
                    <h1 style={{ marginBottom: 0, fontSize: '1rem', fontWeight: 'bold' }}>
                        <HomeButton />
                        &nbsp;&nbsp; {this.props.title}
                    </h1>
                </div>
            </div>
        );
    }
}

export default Titlebar;

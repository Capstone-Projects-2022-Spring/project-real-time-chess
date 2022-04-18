import React from 'react';

/**
 * A component which appears underneath the titlebar.
 */
class SubTitlebar extends React.Component {
    /**
     * Renders the sub-titlebar.
     */
    render() {
        return (
            <div className="row" style={{ backgroundColor: 'rgb(230, 230, 230)' }}>
                {this.props.children}
            </div>
        );
    }
}

export default SubTitlebar;

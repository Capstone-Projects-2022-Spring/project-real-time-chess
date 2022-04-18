import React from 'react';

interface GameHistoryItemProps {
    label: string;
    gameKey: string;
}

/**
 * A component for a single game from the game history.
 */
class GameHistoryItem extends React.Component<GameHistoryItemProps> {
    /**
     * Renders the component for the game history item
     */
    render() {
        return (
            <div>
                <h3>{this.props.label}</h3>
                <p>{this.props.gameKey}</p>
            </div>
        );
    }
}

export default GameHistoryItem;

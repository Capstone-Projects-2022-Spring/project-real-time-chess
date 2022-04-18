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
            <div className="game-history-item">
                <h4>{this.props.label}</h4>
                <p className="game-history-emoji-key">{this.props.gameKey}</p>
            </div>
        );
    }
}

export default GameHistoryItem;

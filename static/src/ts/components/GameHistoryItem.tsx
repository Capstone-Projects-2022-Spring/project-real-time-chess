import React from 'react';
import UINavigator from '../models/UINavigator';
import ReplayMatch from '../views/Matches/ReplayMatch';

interface GameHistoryItemProps {
    label: string;
    gameKey: string;
    timestamp: number;
    moves: MoveRecord[];
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
            <div
                className="game-history-item"
                onClick={() =>
                    UINavigator.render(
                        <ReplayMatch
                            label={this.props.label}
                            gameKey={this.props.gameKey}
                            timestamp={this.props.timestamp}
                            moves={this.props.moves}
                        />,
                    )
                }
            >
                <h4 style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {this.props.label}
                    <small style={{ color: 'gray' }}>
                        {GameHistoryItem.humanReadableDate(this.props.timestamp)}
                    </small>
                </h4>
                <p className="game-history-emoji-key">{this.props.gameKey}</p>
            </div>
        );
    }

    /**
     * Converts a JavaScript Date timestamp (epoch) to a human readable
     * date and time. This timestamp should be the time which the game
     * concluded.
     *
     * @param timestamp - The timestamp to convert.
     * @returns A human readable date and time matching the timestamp.
     */
    static humanReadableDate(timestamp: number) {
        const date = new Date(timestamp);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${month}/${day}/${year} (${hours}:${minutes < 10 ? '0' : ''}${minutes})`;
    }
}

export default GameHistoryItem;

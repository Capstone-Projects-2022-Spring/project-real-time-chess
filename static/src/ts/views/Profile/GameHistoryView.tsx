import React from 'react';
import GameAccess from '../../access/GameAccess';
import GameHistoryItem from '../../components/GameHistoryItem';
import Titlebar from '../../components/Titlebar';
import SupportedEmojis from '../../models/SupportedEmojis';

interface GameHistoryState {
    gameHistory: GameHistory[];
}

/**
 * The view which displays every single game the user has played.
 */
class GameHistoryView extends React.Component<NoProps, GameHistoryState> {
    /**
     * Creates an instance of GameHistoryView.
     *
     * @param props - Accepts no props.
     */
    constructor(props: NoProps) {
        super(props);
        this.state = {
            gameHistory: [],
        };
    }

    /**
     * Once the component mounts, it will fetch all of the game history
     * belonging to the currently logged in user. Then it displays the list
     * of all the games to the view.
     */
    async componentDidMount() {
        const gameHistory = await GameAccess.getHistory();
        this.setState({ gameHistory });
    }

    /**
     * Renders the component.
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title="Game History" />
                <div className="row p-4">
                    {this.state.gameHistory.map((gameHistory, index) => (
                        <div className="col-12 col-md-6 col-lg-4">
                            <GameHistoryItem
                                label={gameHistory.label}
                                gameKey={gameHistory.game_key
                                    .map(
                                        name =>
                                            SupportedEmojis.find(obj => obj.name === name)!.emoji,
                                    )
                                    .join('')}
                                moves={gameHistory.history}
                                timestamp={gameHistory.timestamp}
                                key={index}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default GameHistoryView;

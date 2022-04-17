import * as React from 'react';
import ButtonComponent from '../../components/UI/ButtonComponent';
import UINavigator from '../../models/UINavigator';
import ReplayGame from './ReplayGame';

interface ListOfGamesProps {
    games: string[];
    labele: string;
}

/**
 * List of games
 */
class ListOfGames extends React.Component<ListOfGamesProps, Record<string, never>> {
    /**
     * @returns The react element for the ListOfGames view.
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}></h1>
                    </div>
                </div>
                <div className="row">{this.props.games.map(this.makeButton, this)}</div>
            </div>
        );
    }

    /**
     * Make a button
     * @returns A button component
     */
    makeButton() {
        return (
            <ButtonComponent
                label="Here is button"
                width="100%"
                onClick={() => {
                    UINavigator.render(<ReplayGame username={''} orientation={'b'} />);
                }}
            />
        );
    }
}
export default ListOfGames;
export { ListOfGamesProps };

import React from 'react';
import Titlebar from '../components/Titlebar';

/**
 * Displays a page with instructions on how to play the game.
 * It will also provide an explanation of all the game rules,
 * justifications, and other important information about
 * real-time chess.
 */
class Authors extends React.Component {
    /**
     * Renders the how to play screen.
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title="Authors" />
                <div className="row p-4">
                    <div className="col">
                        <h2>Authors</h2>
                    </div>
                </div>
                <div className="row p-4">
                    <div className="col-12 col-md-6 p-4">
                       
                    </div>
                </div>
            </div>
        );
    }
}

export default Authors;

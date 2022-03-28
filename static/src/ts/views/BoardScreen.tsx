import * as React from 'react';
// import ChessboardComponent from '../components/ChessboardComponent';

interface BoardScreenProps {
    mode: string;
    username: string;
}

interface BoardScreenState {
    mode: string;
    username: string;
}

/**
 * The board screen component.
 */
class BoardScreen extends React.Component<BoardScreenProps, BoardScreenState> {
    /**
     * Creates an instance of BoardScreen.
     * @param props - No props.
     */
    constructor(props: BoardScreenProps) {
        super(props);
        this.state = {
            mode: props.mode,
            username: props.username,
        };
    }

    /**
     * @returns The react element for the BoardScreen view.
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Chessboard</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default BoardScreen;
export { BoardScreenProps, BoardScreenState };

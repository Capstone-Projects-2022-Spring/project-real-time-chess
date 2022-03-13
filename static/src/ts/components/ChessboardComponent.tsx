// import { Chess } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';
// const chess = new Chess();

export default class ChessboardComponent extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <Chessboard />
            </div>
        );
    }
}

import * as React from 'react';
import { Chessboard } from 'react-chessboard';

interface ChessboardComponentProps {
    background: string;
}

interface ChessboardComponentState {
    background: string;
}

export default class ChessboardComponent extends React.Component<
    ChessboardComponentProps,
    ChessboardComponentState
> {
    constructor(props: ChessboardComponentProps) {
        super(props);
        this.state = {
            background: props.background,
        };
    }

    render() {
        return (
            <div style={{ background: this.state.background, color: 'white', padding: '' }}>
                <Chessboard />
            </div>
        );
    }
}

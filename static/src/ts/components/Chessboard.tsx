import * as React from 'react';

interface ChessboardProps {
    background: string;
}

interface ChessboardState {
    background: string;
}

export default class Chessboard extends React.Component<ChessboardProps, ChessboardState> {
    constructor(props: ChessboardProps) {
        super(props);
        this.state = {
            background: props.background,
        };
    }

    render() {
        return (
            <div style={{ background: this.state.background, color: 'white', padding: '' }}>
                <input
                    value={this.state.background}
                    onChange={e => {
                        this.setState({ background: e.target.value });
                    }}
                />
            </div>
        );
    }
}

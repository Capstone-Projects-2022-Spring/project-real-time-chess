import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useState } from 'react';
// const chess = new Chess()

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
            <div style={{ background: this.state.background, color: 'white', 
                padding: '50px 50px 50px 50px'
            }}>
                <Chessboard 
                    arePremovesAllowed={false}
                    
                />
            </div>
        );
    }
}



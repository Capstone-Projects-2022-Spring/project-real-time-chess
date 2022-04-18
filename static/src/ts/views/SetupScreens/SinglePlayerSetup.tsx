import { arrowForward } from 'ionicons/icons';
import React from 'react';
import AIDifficultySelector from '../../components/AIDifficultySelector';
import SubTitlebar from '../../components/SubTitlebar';
import Titlebar from '../../components/Titlebar';
import IconButton from '../../components/UI/IconButton';

interface SinglePlayerSetupState {
    difficulty: number;
}

/**
 * The setup view for setting up a game against artificial intelligence
 */
class SinglePlayerSetup extends React.Component<NoProps, SinglePlayerSetupState> {
    /**
     * Constructor for the single player setup view
     *
     * @param props - Accepts no props
     */
    constructor(props: NoProps) {
        super(props);
        this.state = {
            difficulty: 1,
        };
    }

    /**
     * @returns The single player setup view
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title="You v AI" />
                <SubTitlebar>
                    <div className="col" style={{ textAlign: 'right' }}>
                        <IconButton icon={arrowForward} prepend="Start" onClick={() => undefined} />
                    </div>
                </SubTitlebar>
                <div className="row">
                    <div className="col"></div>
                    <div className="col-12 col-md-6 cold-lg-3">
                        <AIDifficultySelector
                            selected={this.state.difficulty}
                            onChange={difficulty => this.setState({ difficulty })}
                        />
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default SinglePlayerSetup;

import React from 'react';
import SelectButton from './UI/SelectButton';

interface AIDifficultySelectorProps {
    onChange: (difficulty: number) => void;
    selected: number;
}

/**
 * The reusable component for selecting the difficulty of an artificial intelligence bot.
 */
class AIDifficultySelector extends React.Component<AIDifficultySelectorProps> {
    /**
     * Displays the difficulty levels, categorized by how easy they are.
     */
    render() {
        return (
            <div>
                <h5>Extemely Easy</h5>
                <SelectButton
                    value="1"
                    onClick={e => {
                        this.props.onChange(+e);
                    }}
                    selected={this.props.selected === 1}
                >
                    AI Level 1
                </SelectButton>
                <h5>Easy</h5>
                <div className="row">
                    <div className="col-6">
                        <SelectButton
                            value="2"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 2}
                        >
                            AI Level 2
                        </SelectButton>
                    </div>
                    <div className="col-6">
                        <SelectButton
                            value="3"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 3}
                        >
                            AI Level 3
                        </SelectButton>
                    </div>
                </div>

                <h5>Medium</h5>
                <div className="row">
                    <div className="col-6">
                        <SelectButton
                            value="4"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 4}
                        >
                            AI Level 4
                        </SelectButton>
                    </div>

                    <div className="col-6">
                        <SelectButton
                            value="5"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 5}
                        >
                            AI Level 5
                        </SelectButton>
                    </div>
                </div>

                <h5>Hard</h5>
                <div className="row">
                    <div className="col-6">
                        <SelectButton
                            value="6"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 6}
                        >
                            AI Level 6
                        </SelectButton>
                    </div>
                    <div className="col-6">
                        <SelectButton
                            value="7"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 7}
                        >
                            AI Level 7
                        </SelectButton>
                    </div>
                </div>

                <h5>Extremely Hard</h5>
                <div className="row">
                    <div className="col-4">
                        <SelectButton
                            value="8"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 8}
                        >
                            AI Level 8
                        </SelectButton>
                    </div>
                    <div className="col-4">
                        <SelectButton
                            value="9"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 9}
                        >
                            AI Level 9
                        </SelectButton>
                    </div>
                    <div className="col-4">
                        <SelectButton
                            value="10"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 10}
                        >
                            AI Level 10
                        </SelectButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default AIDifficultySelector;

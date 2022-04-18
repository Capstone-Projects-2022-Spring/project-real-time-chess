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
                <h5 className="mt-4 mb-2">Extemely Easy</h5>
                <SelectButton
                    value="1"
                    onClick={e => {
                        this.props.onChange(+e);
                    }}
                    selected={this.props.selected === 1}
                    color="rgb(0, 255, 0)"
                >
                    AI Level 1
                </SelectButton>
                <h5 className="mt-4 mb-2">Easy</h5>
                <div className="row">
                    <div className="col-6">
                        <SelectButton
                            value="2"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 2}
                            color="rgb(0, 255, 155)"
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
                            color="#c9eb34"
                        >
                            AI Level 3
                        </SelectButton>
                    </div>
                </div>

                <h5 className="mt-4 mb-2">Medium</h5>
                <div className="row">
                    <div className="col-6">
                        <SelectButton
                            value="4"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 4}
                            color="#e5eb34"
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
                            color="#ebe534"
                        >
                            AI Level 5
                        </SelectButton>
                    </div>
                </div>

                <h5 className="mt-4 mb-2">Hard</h5>
                <div className="row">
                    <div className="col-6">
                        <SelectButton
                            value="6"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 6}
                            color="#ebc334"
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
                            color="#ebb434"
                        >
                            AI Level 7
                        </SelectButton>
                    </div>
                </div>

                <h5 className="mt-4 mb-2">Extremely Hard</h5>
                <div className="row">
                    <div className="col-4">
                        <SelectButton
                            value="8"
                            onClick={e => {
                                this.props.onChange(+e);
                            }}
                            selected={this.props.selected === 8}
                            color="#eb8c34"
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
                            color="#eb6534"
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
                            color="#eb3434"
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

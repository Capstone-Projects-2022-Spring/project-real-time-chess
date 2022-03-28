import * as React from 'react';
import {NoProps} from '../models/types';
import ButtonComponent from './ButtonComponent';

var one = "1";
var three = "3";
var five = "5";

interface CooldownSelectorState{
    cooldown: string;
}

class CooldownSelectorComponent extends React.Component<NoProps, CooldownSelectorState>{
    constructor(props: NoProps) {
        super(props);
        this.state = {cooldown: ''};
        this.handleClickOne = this.handleClickOne.bind(this);
        this.handleClickThree = this.handleClickThree.bind(this);
        this.handleClickFive = this.handleClickFive.bind(this);
    }

    handleClickOne(){
        this.setState({cooldown: one});
    }

    handleClickThree(){
        this.setState({cooldown: three});
    }

    handleClickFive(){
        this.setState({cooldown: five});
    }

    render(){
        return(
            <div className='container'>
                <div className='container'>
                    <strong>Select the cooldown time</strong>
                </div>
                <div className='container'>
                <ButtonComponent
                    label="1s"
                    onClick={this.handleClickOne}
                />
                <ButtonComponent
                    label="3s"
                    onClick={this.handleClickThree}
                />
                <ButtonComponent
                    label="5s"
                    onClick={this.handleClickFive}
                />
                </div>
            </div>
        );
    }
}

export default CooldownSelectorComponent;
export {CooldownSelectorState};
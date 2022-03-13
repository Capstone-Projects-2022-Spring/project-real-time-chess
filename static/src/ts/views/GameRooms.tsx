import * as React from 'react';
import ButtonComponent from '../components/ButtonComponent';
import { NoProps, NoState } from '../models/types';


/**
 * Game Rooms is acts a lobby for both playeers to gather before playing the game
 * 
 * One user will be able to select between a public or a private lobby.
 * If a private lobby is selected then aroom key will be generated that
 * can be shared with another user. The other user will enter in the 
 * room key and be joined with the first user.
 */



export default class GameRooms extends React.Component<NoProps, NoState>{
    constructor(props: NoProps){
        super(props);
        this.privateButtonClick = this.privateButtonClick.bind(this);
        this.publicButtonClick = this.publicButtonClick.bind(this);
    }

    privateButtonClick(){
        var priRoom = document.getElementById("privateRoom");
        var priButton = document.getElementById("privateButton");
        var pubRoom = document.getElementById("publicRoom");

        priButton?.setAttribute("hidden", "true");
        pubRoom?.setAttribute("hidden", "true");
        priRoom?.removeAttribute("hidden");
        
    }

    publicButtonClick(){
        var pubRoom = document.getElementById("publicRoom");
        var pubButton = document.getElementById("publicButotn");
        var priRoom = document.getElementById("privateRoom");

        pubButton?.setAttribute("hidden", "true");
        priRoom?.setAttribute("hidden", "true");
        pubRoom?.removeAttribute("hidden");
    }

    render(){
        return(
            <div className="container">

                <div className="container" style={{display: 'flex', width: '50%'}}>

                    <div id="privateButon" className="container" style={{border: '2px', margin: '10px'}}>
                        <h1 style={{fontSize: 30}}>Create a Private Room</h1>
                        <ButtonComponent label="Create" width="100%" onClick={this.privateButtonClick} />
                    </div>

                    <div id="publicButton" className="container" style={{border: '2px', margin: '10px'}}>
                        <h2 style={{fontSize: 30}}>Create a Public Room</h2>
                        <ButtonComponent label="Create" width="100%" onClick={this.publicButtonClick} />
                    </div>

                </div>

                <div id="privateRoom" className="container" hidden>
                    <input readOnly></input>
                </div>

                <div id="publicRoom" className="container" hidden>
                    <h4>test</h4>
                </div>
            
            </div>
            
        );
    };
};
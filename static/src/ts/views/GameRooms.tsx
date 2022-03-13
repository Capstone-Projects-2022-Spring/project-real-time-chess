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
    }

    render(){
        return(
            <div className="container">

                <div className="container" style={{display: 'flex', width: '50%'}}>

                    <div className="container" style={{border: '2px', margin: '10px'}}>
                        <h1 style={{fontSize: 30}}>Create a Private Room</h1>
                        <ButtonComponent label="Create" width="100%" onClick={() => undefined} />
                    </div>

                    <div className="container" style={{border: '2px', margin: '10px'}}>
                        <h2 style={{fontSize: 30}}>Create a Public Room</h2>
                        <ButtonComponent label="Create" width="100%" onClick={() => undefined} />
                    </div>

                </div>

                <div id="room">

                </div>
            
            </div>
            
        );
    };
};
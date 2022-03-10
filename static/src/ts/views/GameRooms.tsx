import * as React from 'react';
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
    render(){
        return(
            <div>
                
            </div>
        );
    };
};
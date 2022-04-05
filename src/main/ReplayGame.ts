import { ObjectID } from 'bson';
import { Chess, ChessInstance, Move, Square } from 'chess.js';
import ChessGame from './ChessGame';
import Cooldown from './Cooldown';
import GameHistoryDAO from './dao/GameHistoryDAO';
import UserDAO, { IUser } from './dao/UserDAO';
import GameStateAPIResponse from './GameStateAPIResponse';

class ReplayGame{

   private moveHistory?: MoveRecord[] = [];
   private black?: ObjectID;
   private white?: ObjectID;
   private gameKey: string[];

   constructor(game: GameHistoryDAO, gameKey: string[]){
       this.gameKey = gameKey
       //this.moveHistory =  game.findOne({"game_key": gameKey})

      // this.black =
   }

 }   
}
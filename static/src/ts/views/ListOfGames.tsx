import * as React from 'react';
import ButtonComponent from '../components/ButtonComponent'
import UINavigator from '../models/UINavigator';
import ReplayGame from './ReplayGame';

interface ListOfGamesProps{
    games: String[]
    labele: string
    
}

interface ListOfGamesState{
    
}

class ListOfGames extends React.Component<ListOfGamesProps,ListOfGamesState>{
    /**
     * Creates an instance of the Lsit of the users past games.
     * @param props - No props.
     */
    constructor(props: ListOfGamesProps){
        super(props);
        this.state = {
            labele: ""
        };
    }
     /**
     * @returns The react element for the ListOfGames view.
     */
    render(){
        return(
            <div className="container">
                <div className = "row">
                    <div className = "col">
                        <h1 style={{textAlign: 'center'}}></h1>
                    </div>
                </div>
                <div className='row'>

                </div>
            </div>
        )
    }
    makeButton(){
        return(
            <ButtonComponent
                label = "Here is button"
                width = "100%"
                onClick={()=> {
                    UINavigator.render(<ReplayGame username={''} orientation={'b'} />);
                }}
            />
                
        )
    }
}
export default ListOfGames;
export { ListOfGamesProps, ListOfGamesState };

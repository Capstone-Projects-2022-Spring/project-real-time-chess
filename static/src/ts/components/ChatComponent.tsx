import * as React from 'react';
import { NoState } from '../models/types';

interface ChatComponentProps {
    messages: IGameMessage[];
}
class ChatComponent extends React.Component<ChatComponentProps, NoState> {
    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgb(240, 240, 240)',
                    borderRadius: '1rem',
                    padding: '1rem',
                }}
            >
                {...this.props.messages.map(message => <div>{message.message}</div>)}
            </div>
        );
    }
}

export default ChatComponent;

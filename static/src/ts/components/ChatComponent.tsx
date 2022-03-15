import * as React from 'react';
import GameAccess from '../access/GameAccess';
import { NoProps } from '../models/types';

class ChatComponent extends React.Component<NoProps, { messages: IGameMessage[] }> {
    constructor(props: NoProps) {
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount() {
        this.syncMessages();
        setInterval(() => this.syncMessages(), 1000);
    }

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
                {...this.state.messages.map(message => <div>{message.message}</div>)}
            </div>
        );
    }

    syncMessages(): void {
        GameAccess.getMessages()
            .then(messages => {
                this.setState({ messages });
            })
            .catch(() => {
                this.setState({ messages: [{ message: 'Could not get messages' }] });
            });
    }
}

export default ChatComponent;

import * as React from 'react';
import GameAccess from '../access/GameAccess';

export default class ChatComponent extends React.Component<{}, { messages: IGameMessage[] }> {
    constructor(props: {}) {
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount() {
        this.syncMessages();
        setInterval(() => this.syncMessages(), 1000);
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
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

import * as React from 'react';

interface ChatComponentProps {
    messages: IGameMessage[];
}

/**
 * The chat component which appears during gameplay. This shows all the game messages,
 * including the move history, and any messages sent between players.
 */
class ChatComponent extends React.Component<ChatComponentProps, NoState> {
    /**
     * @returns The chat component with the specified messages.
     */
    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgb(240, 240, 240)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    overflowY: 'scroll',
                }}
            >
                {...this.props.messages.map(message => <div>{message.message}</div>)}
            </div>
        );
    }
}

export default ChatComponent;

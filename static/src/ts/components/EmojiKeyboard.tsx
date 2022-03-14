import * as React from 'react';
export interface EmojiKeyboardState {
    value: EmojiSerializationRecord[];
}

export interface EmojiKeyboardProps {
    onChange?: (value: EmojiSerializationRecord[]) => void;
}

const gameKeyEmojis: EmojiSerializationRecord[] = [
    { emoji: '😀', name: 'grinning' },
    { emoji: '😍', name: 'heart-eyes' },
    { emoji: '😎', name: 'sunglasses' },
    { emoji: '😭', name: 'sob' },
    { emoji: '😱', name: 'scream' },
    { emoji: '🤬', name: 'angry-bleep' },
    { emoji: '🤯', name: 'exploding-head' },
    { emoji: '🤢', name: 'green-face' },
    { emoji: '🤮', name: 'vomiting-face' },
    { emoji: '🤧', name: 'sick-face' },
    { emoji: '🤠', name: 'cowboy-hat' },
    { emoji: '🤡', name: 'clown-face' },
    { emoji: '🤥', name: 'lying-face' },
    { emoji: '🤫', name: 'shushing-face' },
    { emoji: '🤭', name: 'face-with-hand-over-mouth' },
    { emoji: '🤓', name: 'nerd-face' },
];

export default class EmojiKeyboard extends React.Component<EmojiKeyboardProps, EmojiKeyboardState> {
    constructor(props: EmojiKeyboardProps) {
        super(props);
        this.state = {
            value: [],
        };
    }

    render() {
        return (
            <div className="emoji-keyboard">
                <div className="emoji-keyboard-value">
                    {this.state.value.length > 0
                        ? this.state.value.map(({ emoji }) => emoji).join('')
                        : 'Click on the emojis'}
                </div>
                <div className="emoji-keys">
                    {gameKeyEmojis.map(emojiRecord => (
                        <div
                            className="emoji-keyboard-button"
                            onClick={() => {
                                this.setState(
                                    {
                                        value: [...this.state.value, emojiRecord],
                                    },
                                    () => {
                                        if (this.props.onChange)
                                            this.props.onChange(this.state.value);
                                    },
                                );
                            }}
                            key={emojiRecord.name}
                        >
                            {emojiRecord.emoji}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

import { IonIcon } from '@ionic/react';
import { backspace } from 'ionicons/icons';
import * as React from 'react';

interface EmojiKeyboardState {
    value: EmojiSerializationRecord[];
}

interface EmojiKeyboardProps {
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

/**
 * This component provides an "input display" and a "keyboard" for the user to enter emojis.
 * Once an emoji is clicked, it is added to the input display.
 */
class EmojiKeyboard extends React.Component<EmojiKeyboardProps, EmojiKeyboardState> {
    /**
     * Creates an instance of EmojiKeyboard.
     * @param props - Accepts `onChange` as a property. This prop
     * is fired when the user selects an emoji on the emoji keyboard.
     */
    constructor(props: EmojiKeyboardProps) {
        super(props);
        this.state = {
            value: [],
        };
    }

    /**
     * @returns The emoji keyboard react element.
     */
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
                                        if (this.props.onChange) {
                                            this.props.onChange(this.state.value);
                                        }
                                    },
                                );
                            }}
                            key={emojiRecord.name}
                        >
                            {emojiRecord.emoji}
                        </div>
                    ))}
                    <div
                        className="emoji-keyboard-button"
                        onClick={() => {
                            this.setState(
                                {
                                    value: this.state.value.splice(0, this.state.value.length - 1),
                                },
                                () => {
                                    if (this.props.onChange) {
                                        this.props.onChange(this.state.value);
                                    }
                                },
                            );
                        }}
                    >
                        <IonIcon icon={backspace} />
                    </div>
                </div>
            </div>
        );
    }
}

export default EmojiKeyboard;
export { EmojiKeyboardProps, EmojiKeyboardState };

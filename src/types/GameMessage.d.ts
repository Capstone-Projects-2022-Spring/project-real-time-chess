declare interface IGameMessage {
    message: string;
}

declare interface IGameChatMessage extends IGameMessage {
    message: string;
    from: string;
}

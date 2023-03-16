declare interface ICommandManager {
    registerCommand(command: ICommand);
}

declare interface ICommand {
    prefix: string;
    icon: ?string;
    executor: Function<Array<string>>;
}
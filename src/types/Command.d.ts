declare interface CommandDefinition {
    prefix: string;
}

declare interface Command {
    prefix: string;
    executor: Function<Array<string>>;
}

declare type CommandList = Command[];
declare interface CommanderModule {
    onInitialize(commandManager: ICommandManager): Promise<void>;
}

declare interface ModuleDefinition {
    name: string;
    version: string;
    description: string;
}
declare class Module {
    public name;
    constructor(commander: { registerCommand: Function<Command> }) {

    }
}

declare interface ModuleDefinition {
    name: string
}
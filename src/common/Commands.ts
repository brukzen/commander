import {useState} from "../composables/useState";

const {commands} = useState();

export function Command(definition: CommandDefinition): MethodDecorator {
    console.log("Registered command " + definition.prefix);
    return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const command: Command = {
            prefix: definition.prefix,
            executor: descriptor.value,
        }

        commands.value.push(command);
    }
}

export function getCommands() {
    return commands;
}
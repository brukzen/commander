import ApplicationsModule from "./ApplicationsModule";
import {CommandManager} from "../common/CommandManager";

const modules: Array<new (commandManager: CommandManager) => CommanderModule> = [ApplicationsModule]
export default modules;
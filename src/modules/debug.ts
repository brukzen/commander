import {Command} from "../common/Commands";

class Debug implements Module {
    name;

    constructor() {
        this.name = "Debug";
    }

    @Command({prefix: 'debug'})
    debug(args: string) {
        console.log("DEBUG " + args);
    }

    @Command({prefix: 'debug log'})
    debugLog(args: string) {
        console.log(args);
    }

    @Command({prefix: 'test'})
    test() {
        console.log("Test");
    }
}



const debugModule = new Debug();
export default debugModule;
import {Command} from "../common/Commands";

class Debug {
    @Command({prefix: 'debug'})
    debug() {
        console.log("DEBUG");
    }

    @Command({prefix: 'test'})
    test() {
        console.log("Test");
    }
}



const debugModule = new Debug();
export default debugModule;
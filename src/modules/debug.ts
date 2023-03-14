class Debug implements Module {
    name;

    constructor(commander: any) {
        this.name = "Debug";

        commander.registerCommand(this.debug, {
            prefix: 'debug'
        })
        commander.registerCommand(this.debugLog, {
            prefix: 'debug log'
        })
        commander.registerCommand(this.test, {
            prefix: 'test'
        })
    }

    debug(args: string) {
        console.log("DEBUG " + args);
    }

    debugLog(args: string) {
        console.log(args);
    }

    test() {
        console.log("Test");
    }
}



export default Debug;
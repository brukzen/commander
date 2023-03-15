import Debug from "./debug";
import Applications from "./applications";

const modules: Array<new (args: any) => Module> = [Debug, Applications]
export default modules;
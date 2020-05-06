const NpdaMachines = require("./npdamachines");

class NpdaConfig {
    constructor(config) {
        this._config = config
    }

    transitionsFor(currentState, currentChar, topOfStack) {
        let ret = this._config['transitions'][NpdaConfig.generateKey(currentState, currentChar, topOfStack)] || [];
        return ret;
    }

    isAcceptState(state) {
        return this._config.acceptStates.includes(state);
    }
    
    get name() {
        return this._config["name"];
    }

    get startState() {
        return this._config["startState"];
    }
    static parseKey(transitionsKey) {
        return transitionsKey.split("-");
    }

    static generateKey(state, curChar, topOfStack) {
        return `${state}-${curChar}-${topOfStack}`;
    }
}

module.exports = NpdaConfig;

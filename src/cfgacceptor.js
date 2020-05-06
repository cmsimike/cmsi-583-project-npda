const cfgconfigs = require("./cfgmachines");
const NpdaConfig = require("./npdaconfig");
const NpdaSimulator = require("./npda");

class CfgSimulator {
    constructor(config) {
        this._cfgConfig = config;


        let translated = {
            "name": this._cfgConfig["name"],
            "startState": "q0", // constant
            "acceptStates": ["q2"], // constant
            "transitions": {
                "q0--Z": [["q1", this._cfgConfig["startVariable"] + "Z"]], // generated but the same
                "q1--Z": [["q2", ""]],

            }
        }

        // Generate the transitions for the terminals

        for(let i = 0; i < config["terminals"].length; i++) {
            const generatedKey = NpdaConfig.generateKey("q1", config["terminals"][i], config["terminals"][i]);
            translated["transitions"][generatedKey] = [["q1", ""]];
        }

        // productions
        const ruleKeys = Object. keys(this._cfgConfig["rules"]);
        for (let i = 0; i < ruleKeys.length; i++) {
            const ruleKey = ruleKeys[i];
            for(let j = 0; j < this._cfgConfig["rules"][ruleKey].length; j++) {

                const generatedKey = NpdaConfig.generateKey("q1", "", ruleKey);
                if(translated["transitions"][generatedKey] === undefined) {
                    translated["transitions"][generatedKey] = [];
                }
                translated["transitions"][generatedKey].push(["q1", this._cfgConfig["rules"][ruleKey][j]]);
            }
        }

        this._npda = new NpdaSimulator(translated);
    }

    get name() {
        return this._cfgConfig["name"];
    }

    accepts(inputString) {
        return this._npda.accepts(inputString);
    }
}

module.exports = CfgSimulator;
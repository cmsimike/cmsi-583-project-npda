const expect = require('chai').expect;
const CfgSimulator = require("./cfgacceptor");
const cfgMachines = require("./cfgmachines");




describe("cfgacceptor", function(){
    const machineNames = Object.keys(cfgMachines);
    for(let i = 0; i < machineNames.length; i++) {
        const cfgMachine = cfgMachines[machineNames[i]];
        for(let j = 0; j < cfgMachine["acceptStrings"].length; j++){
            const cfgm = new CfgSimulator(cfgMachine);
            it(`${cfgMachine["name"]} should accept string ${cfgMachine["acceptStrings"][j]}`, function() {
                expect(true).to.equal(cfgm.accepts(cfgMachine["acceptStrings"][j]));

            });
        }

        for(let j = 0; j < cfgMachine["rejectStrings"].length; j++){
            const cfgm = new CfgSimulator(cfgMachine);
            it(`${cfgMachine["name"]} should reject string ${cfgMachine["rejectStrings"][j]}`, function() {
                expect(false).to.equal(cfgm.accepts(cfgMachine["rejectStrings"][j]));
            });
        }
    }

});
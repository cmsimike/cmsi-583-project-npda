const expect = require('chai').expect;
const NpdaSimulator = require("./npda");
const NpdaMachines = require("./npdamachines");


describe("NpdaSimulator", function(){
    it("should know it's name", function(){
        const npda = new NpdaSimulator(NpdaMachines.AcceptsOnlyA);

        expect("AcceptsOnlyA").to.equal(npda.name);
    });

    let machines = NpdaMachines.MachineConfigNames();
    for(let i = 0; i < machines.length; i++) {
        const machineName = machines[i];
        const machineConf = NpdaMachines[machineName];
        const npda = new NpdaSimulator(machineConf);

        for(let j = 0; j < machineConf['acceptStrings'].length; j++) {
            const acceptString = machineConf['acceptStrings'][j];
            it(`${machineConf.name} should accept the string ${acceptString}`, function() {
                expect(true).to.equal(npda.accepts(acceptString));
            });

        }
    }

    machines = NpdaMachines.MachineConfigNames();
    for(let i = 0; i < machines.length; i++) {
        const machineName = machines[i];
        const machineConf = NpdaMachines[machineName];
        const npda = new NpdaSimulator(machineConf);

        for(let j = 0; j < machineConf['rejectStrings'].length; j++) {
            const rejectString = machineConf['rejectStrings'][j];
            it(`${machineConf.name} should reject the string ${rejectString}`, function() {
                expect(false).to.equal(npda.accepts(rejectString));
            });

        }
    }


    it('should have a working stack', function() {
        let state = {
            'stack': [],
        };

        NpdaSimulator.pushArr(state, 'Z');

        expect('Z').to.equal(state.stack.pop());


        NpdaSimulator.pushArr(state, 'aZ');
        expect('a').to.equal(state.stack.pop());
        expect('Z').to.equal(state.stack.pop());
    });
});
const expect = require('chai').expect;
const NpdaConfig = require("./npdaconfig");
const Machines = require("./npdamachines");

describe('NpdaConfig', function () {
    it("should parse non-blank keys successfully", function () {
        let ret = NpdaConfig.parseKey('q0-a-Z');

        expect(['q0', 'a', 'Z']).to.eql(ret);
    });
    it("should know the accept states", function () {
        let config = new NpdaConfig(Machines.AcceptsOnlyA);

        expect(true).to.eql(config.isAcceptState('q1'));
    });
    it("should parse blank keys successfully", function () {
        let ret = NpdaConfig.parseKey('q0--Z');

        expect(['q0', '', 'Z']).to.eql(ret);
    });
    it("should generate non-blank keys correctly", function() {
        let ret = NpdaConfig.generateKey('q1', 'a', 'Z');

        expect('q1-a-Z').to.equal(ret);
    });
    it("should generate blank keys correctly", function() {
        let ret = NpdaConfig.generateKey('q1', '', 'Z');

        expect('q1--Z').to.equal(ret);
    });
    it("should return the correct transitions without blanks", function() {
        let config = new NpdaConfig(Machines.AcceptsOnlyA);
        let ret = config.transitionsFor('q0', 'a', 'Z');

        expect([['q1', 'Z'],]).to.eql(ret);
    });
    it("should return an empty array if it can't find a transition", function() {
        let config = new NpdaConfig(Machines.AcceptsOnlyA);
        let ret = config.transitionsFor('q4', 'a', 'Z');

        expect([]).to.eql(ret);
    });
    it("know it's start state", function() {
        let config = new NpdaConfig(Machines.AcceptsOnlyA);


        expect('q0').to.equal(config.startState);
    });
});
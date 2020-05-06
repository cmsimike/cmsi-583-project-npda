const NpdaConfig = require("./npdaconfig");

class NpdaSimulator {
    constructor(config) {
        this._config = new NpdaConfig(config);
    }

    get name() {
        return this._config.name;
    }

    // we use this method to push onto the state.stack array, to deal with special cases
    static pushArr(state, str) {
        // we allow empty pushes but don't do anything with them.
        if (str === '') {
            return;
        }
        for(let i = str.length - 1; i >=0; i--) {
            state.stack.push(str[i]);
        }
    }

    /*
        Responsible for doing the actual transitions, so consuming items as needed
     */
    static StateTransition(currentState, transitionTo, character) {
        // make a clone of the state, so that as we recurse into the simulation, our state
        // doesn't mutate. we have to do this because of the array.
        let duplicatedState = JSON.parse(JSON.stringify(currentState));

        // consume the input character if we have a character to consume, not a blank
        if(character !== ''){
            duplicatedState.inputString = currentState.inputString.substr(1);
        }

        duplicatedState.currentState = transitionTo[0];
        NpdaSimulator.pushArr(duplicatedState, transitionTo[1]);

        return duplicatedState;
    }

    simulate(state) {
        // Are we correctly at an accept state?
        if (state.inputString.length === 0) {
            if (this._config.isAcceptState(state.currentState)) {
                return true;
            }
        }
        // top of stack
        let topOfStack = state.stack.pop();

        //peek at the first character character
        let character = state.inputString[0];

        // transitions
        let transitions = this._config.transitionsFor(state.currentState, character, topOfStack);
        let blankTransitions = this._config.transitionsFor(state.currentState, '', topOfStack);

        // try every one
        for (let i = 0; i < blankTransitions.length; i++) {
            let transition = blankTransitions[i];

            let updatedState = NpdaSimulator.StateTransition(state, transition, '');

            if (this.simulate(updatedState)) {
                return true;
            }
        }

        // try every one
        for (let i = 0; i < transitions.length; i++) {
            let transition = transitions[i];

            let updatedState = NpdaSimulator.StateTransition(state, transition, character);

            if (this.simulate(updatedState)) {
                return true;
            }
        }

        return false;
    }

    accepts(inputString) {
        let state = {
            "stack": [],
            "currentState":"",
            "inputString": "",
        };

        NpdaSimulator.pushArr(state, "Z");
        state.currentState = this._config.startState;
        state.inputString = inputString;

        return this.simulate(state);
    }
}

module.exports = NpdaSimulator;
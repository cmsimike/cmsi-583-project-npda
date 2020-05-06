class NpdaMachines {
    // accepts any number of a but rejects strings with b
    static AcceptsOnlyA = {
        "name": "AcceptsOnlyA",
        "startState": "q0",
        "transitions": { // transitions[state] -> list of transitions
            // format for key: currentState-currentInputChar-topOfStack
            // format for value: array of arrays, where each subarray
            // is in the format: ["transitionToState", "pushOntoStackChar"]
            "q0-a-Z": [["q1", "Z"],],
            "q0-b-Z": [["q2", "Z"],],
            "q1-a-Z": [["q1", "Z"],],
            "q1-b-Z": [["q2", "Z"],],

        },
        "acceptStates": ["q1"],
        "acceptStrings": ["a", "aaaaaaaaaaaa", "aaaaaa"],
        "rejectStrings": ["aaaaab", "aaabaaaa", "", "b",]
    };

    static AcceptsOnlyAMultiPath = {
        "name": "AcceptsOnlyAMultiPath",
        "startState": "q0",
        "transitions": { // transitions[state] -> list of transitions
            "q0-a-Z": [["q2", "Z"], ["q1", "Z"],],
            "q0-b-Z": [["q2", "Z"],],
            "q1-a-Z": [["q1", "Z"],],
            "q1-b-Z": [["q2", "Z"],],

        },
        "acceptStates": ["q1"],
        "acceptStrings": ["aaaaaa", "aaaaaaaaaaaa", "aaaaaa"],
        "rejectStrings": ["ab", "aaabaaaa", "", "b", "ab", "aaaaaab", "abbbbbbbbb"]
    };

    static AcceptsOnlyAMultiPathPointlessEmpty = {
        "name": "AcceptsOnlyAMultiPathPointlessEmpty",
        "startState": "q0",
        "transitions": { // transitions[state] -> list of transitions
            "q0--Z": [["q3", "Z"],],
            "q0-b-Z": [["q2", "Z"],],
            "q1-a-Z": [["q1", "Z"],],
            "q1-b-Z": [["q2", "Z"],],
            "q3-a-Z": [["q2", "Z"], ["q1", "Z"],],

        },
        "acceptStates": ["q1"],
        "acceptStrings": ["aaaaaa", "aaaaaaaaaaaa", "aaaaaa"],
        "rejectStrings": ["ab", "aaabaaaa", "", "b", "ab", "aaaaaab", "abbbbbbbbb"]
    }

    static Palindrome = {
        "name": "Palindrome",
        "startState": "q0",
        "transitions": { // transitions[state] -> list of transitions
            "q0-a-Z": [["q0", "aZ"], ["q1", "Z"]],
            "q0-b-Z": [["q0","bZ"], ["q1", "Z"]],
            "q0-a-a": [["q0","aa"], ["q1","a"]],
            "q0-b-a": [["q0", "ba"], ["q1", "a"]],
            "q0-a-b": [["q0", "ab"], ["q1", "b"]],
            "q0-b-b": [["q0", "bb"], ["q1", "b"]],
            "q0--Z": [["q1", "Z"]],
            "q0--a": [["q1", "a"]],
            "q0--b": [["q1", "b"]],
            "q1-a-a": [["q1", ""]],
            "q1-b-b": [["q1", ""]],
            "q1--Z": [["q2", "Z"]],
        },
        "acceptStates": ["q2"],
        "acceptStrings": ["aba", "a", "bb", "bbb", "", "bbaabb"],
        "rejectStrings": ["abaa", "aaabaaaa", "aaaaaab", "abbbbbbbbb", "ab"]
    }

    static MachineConfigNames() {
        const machines = Object.getOwnPropertyNames( NpdaMachines ).filter(function(e){
            return !["length", "prototype", "name", "MachineConfigNames"].includes(e);
        });

        return machines;
    }
}

module.exports = NpdaMachines;
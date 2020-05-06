const cfg1 = {
    name: "cfg1",
    rules: {
        'A': ['bAb', "a"],
    },
    terminals: ['a','b'],
    startVariable: 'A',
    acceptStrings: ["bbabb", "bbbbabbbb", "bab"],
    rejectStrings: ["bbbab"],
};

const cfg2 = {
    name: "accept all strings over the alphabet including empty",
    rules: {
        'A': ["aA", "bA", "cA", ""],
    },
    terminals: ['a','b', 'c'],
    startVariable: 'A',
    acceptStrings: ["abcbcabca", "abc", "bab", "", "bbbbb", "ababababa"],
    rejectStrings: ["g"],
};

const cfg3 = {
    name: "accept all strings over the alphabet, no empty",
    rules: {
        'A': ["aB", "bB", "cB"],
        'B': ["aB", "bB", "cB", ""],
    },
    terminals: ['a','b', 'c'],
    startVariable: 'A',
    acceptStrings: ["abcbcabca", "abc", "bab", "bbbbb", "ababababa"],
    rejectStrings: ["g", "", "abbbbg", "cccccgbaaaaaa"],
};

export {cfg1,cfg2, cfg3};
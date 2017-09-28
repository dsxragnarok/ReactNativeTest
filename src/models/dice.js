export function random (maxValue) {
    if (typeof maxValue !== 'number' ||
        maxValue < 0 ||
        !Number.isInteger(maxValue)) {
        throw new Error('Expected a positive integer argument');
    }

    return Math.floor(Math.random() * maxValue);
}

function d2 () { return random(2) + 1; }
function d4 () { return random(4) + 1; }
function d6 () { return random(6) + 1; }
function d8 () { return random(8) + 1; }
function d10 () { return random(10) + 1; }
function d12 () { return random(12) + 1; }
function d20 () { return random(20) + 1; }
function d100 () { return random(100) + 1; }

export const types = { d2, d4, d6, d8, d10, d12, d20, d100 };

export function rollDieTypeNTimes (n, die) {
    return Array(n).fill().map(() => die());
}


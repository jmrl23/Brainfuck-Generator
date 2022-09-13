"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
/**
 * Set initial pointer
 *
 * @param {number} divident
 * @param {number} divisor
 * @returns {string}
 */
function generateInitial(divident, divisor) {
    const characters = ['+', '-'];
    const quotient = divident / divisor;
    const excess = quotient % 10;
    if (quotient !== Math.floor(divident / divisor))
        throw new Error(`${divident} is not divisible by ${divisor}`);
    if (quotient < 10)
        throw new Error('Quotient must be greater than 10');
    const removedExcess = quotient - excess;
    let balanced = removedExcess - 1;
    let temp = balanced;
    while (temp !== Math.floor(temp) || temp === balanced) {
        if (balanced <= 0)
            throw new Error('Cannot balance');
        balanced--;
        if (balanced === removedExcess / 2)
            continue;
        temp = removedExcess / balanced;
    }
    let output = '';
    output += outputBreaker(characters[0].repeat(removedExcess / balanced));
    output += `\n[\n  > ${outputBreaker(characters[0].repeat(balanced))}\n  < -\n]\n> ${outputBreaker(characters[0].repeat(excess))}\n`;
    return output;
}
/**
 * Generate "sets" (movements of pointer)
 *
 * @param {number} divisor
 * @param {string} input
 * @returns {string}
 */
function generateSets(divisor, input) {
    let output = '[\n';
    for (let i = 0; i < input.length; i++) {
        output += `  > ${'+'.repeat(divisor)}`;
        if ((i + 1) % 10 === 0)
            output += '\n';
    }
    output += `\n  ${outputBreaker('<'.repeat(input.length)) + ' -'}\n]\n`;
    return output;
}
/**
 * Convert into ASCII every character of the input
 *
 * @param {string} input
 * @returns {number[]}
 */
function convertToAscii(input) {
    const collection = [];
    for (let i = 0; i < input.length; i++) {
        collection.push(input.charCodeAt(i));
    }
    return collection;
}
/**
 * Get difference between the base input and item inside the collection
 *
 * @param {number} base
 * @param {number[]} collection
 * @returns {Array<number>}
 */
function getDifference(base, collection) {
    return collection.map(value => base - value);
}
/**
 * Breaks output into new line
 *
 * @param {string} input
 * @returns {string}
 */
function outputBreaker(input) {
    var _a, _b;
    return ((_b = (_a = input.match(/.{1,5}/g)) === null || _a === void 0 ? void 0 : _a.join(' ').match(/.{1,60}/g)) === null || _b === void 0 ? void 0 : _b.join('\n ')) || '';
}
/**
 * Generate the output
 *
 * @param {number} num
 * @returns {string}
 */
function generateOutput(num) {
    const characters = ['+', '-'];
    const isNegative = num < 0;
    num = Math.abs(num);
    return outputBreaker(characters[isNegative ? 0 : 1].repeat(num));
}
/**
 * Run brainfuck generator
 *
 * @export
 * @param {string} input
 * @param {boolean} [minified=false]
 * @param {number} [divident=92]
 * @param {number} [divisor=2]
 * @returns {string}
 */
function run(input, minified = false, divident = 92, divisor = 2) {
    const initial = generateInitial(divident, divisor);
    const sets = generateSets(divisor, input);
    const ascii = convertToAscii(input);
    const difference = getDifference(divident, ascii);
    const result = difference.map(generateOutput).map(item => `> ${item} .`).join('\n');
    const output = minified ? (initial + sets + result).replace(/\s+/g, '') : initial + sets + result;
    return output;
}
exports.run = run;

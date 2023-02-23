/**
 * Set initial pointer
 *
 * @param {number} divident
 * @param {number} divisor
 * @returns {string}
 */
function generateInitial(divident: number, divisor: number): string {
  const characters = ['+', '-']
  const quotient = divident / divisor
  const excess = quotient % 10
  if (quotient !== Math.floor(divident / divisor))
    throw new Error(`${divident} is not divisible by ${divisor}`)
  if (quotient < 10) throw new Error('Quotient must be greater than 10')
  const removedExcess = quotient - excess
  let balanced = removedExcess - 1
  let temp = balanced
  while (temp !== Math.floor(temp) || temp === balanced) {
    if (balanced <= 0) throw new Error('Cannot balance')
    balanced--
    if (balanced === removedExcess / 2) continue
    temp = removedExcess / balanced
  }
  let output = ''
  output += outputBreaker(characters[0].repeat(removedExcess / balanced))
  output += `\n[\n  > ${outputBreaker(
    characters[0].repeat(balanced)
  )}\n  < -\n]\n> ${outputBreaker(characters[0].repeat(excess))}\n`
  return output
}

/**
 * Generate "sets" (movements of pointer)
 *
 * @param {number} divisor
 * @param {string} input
 * @returns {string}
 */
function generateSets(divisor: number, input: string): string {
  let output = '[\n'
  for (let i = 0; i < input.length; i++) {
    output += `  > ${'+'.repeat(divisor)}`
    if ((i + 1) % 10 === 0) output += '\n'
  }
  output += `\n  ${outputBreaker('<'.repeat(input.length)) + ' -'}\n]\n`
  return output
}

/**
 * Convert into ASCII every character of the input
 *
 * @param {string} input
 * @returns {number[]}
 */
function convertToAscii(input: string): number[] {
  const collection = []
  for (let i = 0; i < input.length; i++) {
    collection.push(input.charCodeAt(i))
  }
  return collection
}

/**
 * Get difference between the base input and item inside the collection
 *
 * @param {number} base
 * @param {number[]} collection
 * @returns {Array<number>}
 */
function getDifference(base: number, collection: number[]): number[] {
  return collection.map((value) => base - value)
}

/**
 * Breaks output into new line
 *
 * @param {string} input
 * @returns {string}
 */
function outputBreaker(input: string): string {
  return (
    input
      .match(/.{1,5}/g)
      ?.join(' ')
      .match(/.{1,60}/g)
      ?.join('\n ') || ''
  )
}

/**
 * Generate the output
 *
 * @param {number} num
 * @returns {string}
 */
function generateOutput(num: number): string {
  const characters = ['+', '-']
  const isNegative = num < 0
  num = Math.abs(num)
  return outputBreaker(characters[isNegative ? 0 : 1].repeat(num))
}

/* A type definition for the function run. */
interface Payload {
  input: string
  minified?: boolean
  divident?: number
  divisor?: number
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
export function run(payload: Payload): string {
  let { input, minified, divident, divisor } = payload
  divident = parseInt(divident?.toString() || '92', 10)
  divisor = parseInt(divisor?.toString() || '2', 10)
  const initial = generateInitial(divident, divisor)
  const sets = generateSets(divisor, input)
  const ascii = convertToAscii(input)
  const difference = getDifference(divident, ascii)
  const result = difference
    .map(generateOutput)
    .map((item) => `> ${item} .`)
    .join('\n')
  const output = minified
    ? (initial + sets + result).replace(/\s+/g, '')
    : initial + sets + result
  return output
}

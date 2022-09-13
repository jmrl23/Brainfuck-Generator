# BRAINFUCK GENERATOR
Converts raw string into brainfuck.
```js
// import { run } from './dist'
const { run } = require('./dist')

// outputs `Hello, World!` into brainfuck format
console.log(run('Hello, World!'))
```

### Type
```js
/**
 * @param {string} input
 * @param {boolean} [minified=false]
 * @param {number} [divident=92]
 * @param {number} [divisor=2]
 * @returns {string}
 */
function run(
  input: string, 
  minified?: boolean, 
  divident?: number, 
  divisor?: number
): string;
```
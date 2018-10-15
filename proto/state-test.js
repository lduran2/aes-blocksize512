/**
 * ./state-test.js
 * Tests the StateArray class.
 * for: aes-blocksize512
 * date: 2018-10-15 T00:10
 */

let state = require('./state.js');

/* the input plaintext */
let text=[ 0, 4, 8, 12,
		   1, 5, 9, 13,
		   2, 6, 10, 14,
		   3, 7, 11, 15];

/* state array on input */
let s = state.newStateArray4(text, 4);

/* message to log */
let message = '';

for (let k = 0; k < 4; ++k) {
	for (let l = 0; l < 4; ++l) {
		message += s.get(k, l) + ' ';
	} /* next l */
	message += '\n'
} /* next k */

/* log the message and state array as an array */
console.log(message);
console.log(s.toFlatArray());

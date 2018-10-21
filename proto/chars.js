/**
 * ./chars.js
 * Methods for casting to and from characters.
 * for: <https://github.com/lduran2/aes-blocksize512>
 * date: 2018-10-20 T22:27
 * by: Leomar Durán <https://github.com/lduran2>
 */

'use strict';

const ints = require('./ints.js') /* for toHexString */

/******************************************************************//**
 * @params
 *   $i :int = ascii code of the character to return
 * @return the character corresponding to the given ascii code
 */
exports.intToChar = ((i) => (carr[i]));

/******************************************************************//**
 * @params
 *   $c :char = character whose ascii code to return
 * @return the ascii code corresponding to the given character
 */
exports.charToInt = ((c) => (asciis[c]));

/********************************************************************/

/* array of characters with ascii code for indices */
const carr = [];
/* map of characters to ascii codes */
const asciis = {};

/* populate the array @carr and map %asciis */
for (let k = 0; (k < 128); ++k) {
	let c = unescape('%' + ints.toHexString(k, 2));
	carr.push(c);
	asciis[c] = k;
} /* next k */

/* end ./chars.js */

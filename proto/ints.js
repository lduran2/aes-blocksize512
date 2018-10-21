/**
 * ./ints.js
 * Operations on integers
 * for: <https://github.com/lduran2/aes-blocksize512>
 * date: 2018-10-15 T14:21
 * by: Leomar Durán <https://github.com/lduran2>
 */

'use strict';

/**
 * @params
 *   $i :int = the integer whose hexadecimal string representation
 *     to return
 *   $width :int = the minimum number of hexadecimal digits that the
 *     representation should have
 * @return the hexadecimal string representation of the integer
 * specified by $i with the given $width
 */
exports.toHexString = ((i, width) => {
	let hexits = []; /* hex digits of $i */
	
	for (let q = i; q; q >>= 4) {
		hexits.unshift(possibleHexits[q & 0xF]);
	} /* next q */
	/* pad the remaining digits */
	for (let k = hexits.length; (k < width); ++k) {
		hexits.unshift(0);
	} /* next k */
	/* join the elements */
	return hexits.join('');
});

/* array of possible hex-digits */
const possibleHexits = [
	'0', '1', '2', '3',
	'4', '5', '6', '7',
	'8', '9', 'A', 'B',
	'C', 'D', 'E', 'F'
];

/* end ./ints.js */

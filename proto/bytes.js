/**
 * ./byte.js
 * Defines operations on bytes needed for AES encryption.
 * for: <https://github.com/lduran2/aes-blocksize512>
 * date: 2018-10-21 T01:24
 * by: Leomar Durán <https://github.com/lduran2>
 */
 
'use strict';

/* irreducible polynomial */
const m = 0b100011011;
/* bit mask for a byte */
const byteMask = 0xFF;

/******************************************************************//**
 * Adds two bytes
 * @return the sum of the two bytes
 */
exports.add = ((b, c) => (b ^ c));

/******************************************************************//**
 * Subtracts the $minuend by the $subtrahend
 * @params
 *   $minuend :byte = the byte wherefrom to subtract
 *   $subtrahend :byte = the byte whereby to subtract
 * @return the difference of the $subtrahend from the $minuend
 */
exports.sub = exports.add;

/******************************************************************//**
 * Multiplies two bytes
 * @return the product of the two bytes
 */
exports.mul = ((b, c) => {
	let sum = 0;
	const sorted = sort(b, c);
	let prod = sorted[1];

	for (let q = sorted[0]; q; q >>= 1) {
		if (q & 1) {
			sum = exports.add(sum, prod);
		} /* end if (q & 1) */
		prod = exports.xtimes(prod);
	} /* next q */
	return sum;
});

/******************************************************************//**
 * Multiplies the x-polynomial $b by x
 * @return the product of the polynomial
 */
exports.xtimes = ((b) => {
	const lshift = (b << 1);
	let result = lshift;
	let overflow = (lshift & (1 << 8));
	/* mod by $m */
	if (overflow) {
		result = exports.sub(result, m);
	} /* end if (overflow) */
	return result;
});

/******************************************************************//**
 * Sorts the two integers (n, m) in ascending order
 * @return the integers in order
 */
function sort(n, m) {
	let result;
	if (n <= m) {
		result = [n, m];
	} /* end if (n <= m) */
	else {
		result = [m, n];
	} /* else (n <= m) */
	return result;
} /* end function sort(int, int) */

/* end ./bytes.js */

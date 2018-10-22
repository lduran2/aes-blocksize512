/**
 * ./state.js
 * Operations on state arrays
 * for: <https://github.com/lduran2/aes-blocksize512>
 * date: 2018-10-21 T22:59
 * by: Leomar Durán <https://github.com/lduran2>
 */

'use strict';

/******************************************************************//**
 * @params
 *   @input :byte[] = input text
 *   $Nb :int = number of columns, or 32-bit words
 * @return a state array representation of the given flat array with
 * column height 4
 * @see #toStateArray
 */
exports.toStateArray4 = ((input, Nb) => exports.toStateArray(4, input, Nb));

/******************************************************************//**
 * @params
 *   $colHeight :int = the column height, or, number of rows per column
 *   @input :byte[] = input text
 *   $Nb :int = number of columns, or 32-bit words
 * @return a state array representation of the given flat array with
 * the column height given by $colHeight and $Nb columns
 */
exports.toStateArray = ((colHeight, input, Nb) => {
	let result = [];
	for (let r = 0; (r < colHeight); ++r) {
		result[r] = [];
		for (let c = 0; (c < Nb); ++c) {
			result[r][c] = input[r + (colHeight*c)];
		} /* next c */
	} /* next r */
	return result;
}/* end #toStateArray(int, byte[], int) */);

/******************************************************************//**
 * Creates a new state array by mapping the elements of the state array
 * given by @state by applying the specified function
 * @params
 *   @state :byte[] = state array on whose elements to map
 *   &func :function<byte,int,int,byte[],byte[][]> = the function to
 *     apply on each element, its row and column indices, the
 *     corresponding row array and the state array
 */
exports.map = ((state, func) => (
	state.map((row, iRow, rows) => (
		row.map((el, iCol, row) => (
			func(el, iRow, iCol, row, rows)))
		)
	)
));

/******************************************************************//**
 * @params
 *   @input :byte[][] = the state array
 * @return a flat array representation of the state array
 */
exports.toFlatArray = ((input) => [].concat(...input));

/* end ./state.js */

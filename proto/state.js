/**
 * ./state.js
 * Operations on state arrays
 * for: <https://github.com/lduran2/aes-blocksize512>
 * date: 2018-10-21 T00:30
 * by: Leomar Durán <https://github.com/lduran2>
 */

'use strict';

/******************************************************************//**
 * Executes the function given by &func on each element of the @state
 * array
 * @params
 *   @state :byte[] = state array on whose elements to execute the
 *     function
 *   &func :function<byte,int,int,byte[],byte[][]> = the function to
 *     execute on the elements of the @state array
 */
exports.forEach = ((state, func) => (
	state.map((row, iRow, rows) => (
		row.map((el, iCol, row) => (
			func(el, iRow, iCol, row, rows)))
		)
	)
));

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
 * @params
 *   @input :byte[][] = the state array
 * @return a flat array representation of the state array
 */
exports.toFlatArray = ((input) => [].concat(...input));

/* end ./state.js */

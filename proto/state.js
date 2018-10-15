/**
 * ./state.js
 * Defines StateArray as the state array with variable column height
 * and newStateArray4 as the state array with a fixed column height of
 * 4.
 * for: aes-blocksize512
 * date: 2018-10-15 T00:10
 */

/**
 * @params
 *   input := input text
	 *   Nb := number of columns, or 32-bit words
 * @return a new state array with the given input text and a column height of 4 rows
 */
exports.newStateArray4 = (plaintext, Nb) => {
	return new exports.StateArray(4, plaintext, Nb);
} /* end function newStateArray4(string) */

/*
 * StateArray block class.
 */
exports.StateArray = class {
	/**
	 * Creates a new state array with the given input text and the given column height
	 * @params
	 *   colHeight := the column height, or, number of rows per column
	 *   input := input text
	 *   Nb := number of columns, or 32-bit words
	 * @return a new state array
	 */
	constructor(colHeight, input, Nb) {
		this.colHeight = colHeight;
		this.input = input;
		this.Nb = Nb;
	} /* end #constructure(int, int, int) */

	/**
	 * @params
	 *   r := row number
	 *   c := column number
	 * @return the byte at the row and column given by @(r, c).
	 */
	get(r, c) {
		return this.input[r + (this.colHeight*c)];
	} /* end #get(int, int) */

	/**
	 * @return a flat array representation of the state array
	 */
	toFlatArray() {
		let arr = [];
		let nCols = this.Nb;
		for (let iRow = 0; (iRow < this.colHeight); ++iRow) {
			for (let iCol = 0; (iCol < nCols); ++iCol) {
				arr.push(this.get(iRow, iCol));
			} /* next iCol */
		} /* next iRow */
		return arr;
	} /* end #toArray() */
} /* end class StateArray */

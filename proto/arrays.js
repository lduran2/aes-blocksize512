/**
 * ./cipher.js
 * Transforms plaintext into ciphertext
 * for: <https://github.com/lduran2/aes-blocksize512>
 * date: 2018-10-21 T22:59
 * by: Leomar Durán <https://github.com/lduran2>
 * pseudocode from: https://csrc.nist.gov/csrc/media/publications/fips/197/final/documents/fips-197.pdf
 */

'use strict';

/* for the state array */
const stateArray = require('./state.js');
const bytes = require('./bytes.js');

/*********************************************************************/
/* (byte in[4*Nb], byte out[4*Nb], word w[Nb*(Nr+1)]) */
function cipher(colHeight, input, w, Nb) {
	/* copy in into $state array */
	// const copy = arr.slice(0);
	const state = stateArray.toStateArray(arr, Nb);

	/* AddRoundKey(state, w[0, Nb-1]) // See Sec. 5.1.4 */
	AddRoundKey(state, w, 0, (Nb - 1));

	/* for round = 1 step 1 to Nr–1 */
	for (var round = 1; i < Nr; ++i) {
		/* SubBytes(state) // See Sec. 5.1.1 */
		exports.subBytes(state);
		/* ShiftRows(state) // See Sec. 5.1.2 */
		shiftRows(state);
		/* MixColumns(state) // See Sec. 5.1.3 */
		mixColumns(state);
		/* AddRoundKey(state, w[round*Nb, (round+1)*Nb-1]) */
		addRoundKey(state, w, (round*Nb), (((round + 1)*Nb) - 1));
	} /* next round */

	/* SubBytes(state) */
	exports.subBytes(state);
	/* ShiftRows(state) */
	exports.shiftRows(colHeight, state, Nb);
	/* AddRoundKey(state, w[Nr*Nb, (Nr+1)*Nb-1]) */
	addRoundKey(state, w, (Nr*Nb), (((Nr + 1)*Nb) - 1));

	/* out = state */
	return state;
} /* end #cipher(w) */

/*********************************************************************/
exports.subBytes = ((state) => (
	stateArray.map(state, ((el, _0, _1, _2, _3) => (sBox[el])))
)/* end #subBytes(stateArray) */);

/******************************************************************//**
 * Shifts each row in the @state array with column height 4 cyclically
 * @params
 *   $colHeight :int = the column height, or, number of rows per column
 *   $Nb :int = number of columns, or 32-bit words
 */
exports.shiftRows4 = ((state, Nb) => exports.shiftRows(4, state, Nb));

/******************************************************************//**
 * Shifts each row in the @state array cyclically
 * @params
 *   $colHeight :int = the column height, or, number of rows per column
 *   @state :byte[] = the state array whose rows to shift
 *   $Nb :int = number of columns, or 32-bit words
 */
exports.shiftRows = ((colHeight, state, Nb) => {
	for (let r = 0; (r < colHeight); ++r) {
		shiftArr(state[r], Nb, r);
	} /* next r */
}/* end #shiftRows(int, byte[][], int) */);

/******************************************************************//**
 * Shifts the given array cyclically by $shift positions
 * @params
 *   @arr := the array to shift
 *   $length := length of the array to shift
 *   $shift := the number of positions by which to shift @arr
 */
function shiftArr(arr, length, shift) {
	/* end of shifted section */
	let shiftEnd = (length - shift);
	/* temporary storage for shifted section */
	let temp = [];

	/* store the overflow characters at the beginning */
	copyArr(arr, 0, length, temp, 0);
	/* shift the tail leftward */
	copyArr(arr, shift, length, arr, 0);
	/* copy the overflow into the tail end */
	copyArr(temp, 0, shift, arr, shiftEnd);
} /* end #shiftArr(Object[], int, int) */

/******************************************************************//**
 * Copies the @source array from the range [$srcOffset, $srcEnd[ into
 * the @target array, starting at $tgtOffset
 * @params
 *   @source := the array from which to copy
 *   $srcOffset :int = the offset in the @source
 *   $srcEnd :int = end of the source Array
 *   @target := the array to which to copy
 *   $tgtOffset :int = the offset in the @target
 */
function copyArr(source, srcOffset, srcEnd, target, tgtOffset) {
	for (let iSrc = srcOffset, iTgt = tgtOffset; (iSrc < srcEnd); ++iSrc, ++iTgt) {
		target[iTgt] = source[iSrc];
	} /* next iSrc, iTgt */
} /* end function copyArr(Object[], int, int, Object[], int) */

/******************************************************************//**
 * Performs the mix columns transformation on the specified @state
 * array with a column height of 4
 * @params
 *   $colHeight :int = the column height, or, number of rows per column
 *   $Nb :int = number of columns, or 32-bit words
 */
exports.mixColumns4 = ((state, Nb) => exports.mixColumns(4, state, Nb));

/******************************************************************//**
 * Performs the mix columns transformation on the specified @state
 * array
 * @params
 *   $colHeight :int = the column height, or, number of rows per column
 *   @state :byte[] = the state array whose rows to shift
 *   $Nb :int = number of columns, or 32-bit words
 */
exports.mixColumns = ((colHeight, state, Nb) => {
	let result = [];
	for (let k = 0; k < Nb; ++k) {
		result[k] = bytes.matrixTimesVector(mixColumnsMatrix, nMixColumnsRows, state[k], colHeight);
	} /* next k */
	return result;
}/* #mixColumns(int, byte[][], int) */);

/*********************************************************************/
function addRoundKey(state, word, start, end) {}

exports.applySBox = ((k) => sBox[k]);

/**
 * Substitution box for #subBytes
 */
const sBox = [
	0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
	0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
	0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
	0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
	0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
	0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
	0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
	0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
	0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
	0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
	0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
	0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
	0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
	0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
	0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
	0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
];

/**
 * Matrix for #mixColumns transformation
 */
const mixColumnsMatrix = [
	[ 0x02, 0x03, 0x01, 0x01 ],
	[ 0x01, 0x02, 0x03, 0x01 ],
	[ 0x01, 0x01, 0x02, 0x03 ],
	[ 0x03, 0x01, 0x01, 0x02 ]
];

/**
 * Number of rows in the #mixColumnsMatrix
 */
const nMixColumnsRows = 4;

/* end ./cipher.js */

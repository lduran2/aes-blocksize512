/**
 * ./key.js
 * Operations for key expansion
 * for: <https://github.com/lduran2/aes-blocksize512>
 * date: 2018-10-21 T22:15
 * by: Leomar Durán <https://github.com/lduran2>
 * pseudocode from: https://csrc.nist.gov/csrc/media/publications/fips/197/final/documents/fips-197.pdf
 */

'use strict';

const cipher = require('./cipher.js');

exports.keyExpansion = ((key, Nk, Nb, Nr, w, Nk) => {
	let temp;
	let k = 0;

	while (k < Nk) {
		w[k] = [];
		for (let l = 0; l < 4; ++l) {
			w[k][l] = key[(4*k) + l];
		}
		++k;
	} /* end while (k < Nk) */

	/* k = Nk */

	while (k < (Nb*(Nr + 1))) {
		let rem = (k % Nk);
		temp = w[k - 1];
		if (rem == 0) {
			temp = (SubWord(RotWord(temp)) ^ Rcon[k/Nk]);
		}
		else if ((Nk > 6) && (rem ==4)) {
			temp = SubWord(temp);
		}
		w[k] = (w[k - Nk] ^ temp);
		++k;
	} /* end while (k < (Nb*(Nr + 1))) */
});

exports.subWord = ((key) => key.map(cipher.applySBox));

/* end ./key.js */

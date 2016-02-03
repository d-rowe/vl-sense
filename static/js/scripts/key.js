// Check for problematic keys (ex. B#M:)
problemkeys = ['B#M', 'b#m', 'gbm', 'A#M'];

$(function() {
	$('#key').on('change', function() {
		// Parse key
		var key = $("#key").val();
		if (key == '') {
			key = score.previouskey;
		}
		var unsupportedkeys = ['B#']
		var letter = key[0];
		var upLetter = letter.toUpperCase();
		var letVal = upLetter.charCodeAt(0);
		var accidental = getAccidental(key);
		var sonority = getSonority(accidental);

		// check that val[0] is a real note letter
		if (letVal >= 65 && letVal <= 71) {
			// Positive feedback (color)?
		} else {
			// Flash red if key valid could not be found
			flash('#key', "#FF3D2E");

			// Revert to last valid key
			key = score.previouskey;
			letter = key[0];
			upLetter = letter.toUpperCase();
			letVal = upLetter.charCodeAt(0);
			accidental = getAccidental(key);
			sonority = getSonority(accidental);
		}

		// Sync case of letter and sonority
		if (sonority == 'M') {
			letter = upLetter;
		} else if (sonority == 'm') {
			letter = letter.toLowerCase();
		} else {
			if (letter == letter.toLowerCase()) {
				sonority = 'm';
			} else {
				sonority = 'M';
			}
		}

		var corrected = letter + accidental + sonority + ':';

		$("#key").val(corrected);
		score.previouskey = corrected;

		if (sonority == 'M') {
			var vexkey = upLetter + accidental
		} else {
			var vexkey = upLetter + accidental + sonority
		}
		score.key = vexkey;
		reloadscore();
		score.keyAccidentals = getAccidentals();
	})
})

function getAccidental(key) {
	if ((key[1] == 'b') || (key[1] == '#')) {
		var accidental = key[1];
	} else if (key[1] == 'B') {
		var accidental = 'b';
	} else {
		var accidental = '';
	}
	return accidental;
}

function getSonority(accidental) {
	if (accidental) {
		var sonority = key[2];
	} else {
		var sonority = key[1];
	}
	return sonority;
}

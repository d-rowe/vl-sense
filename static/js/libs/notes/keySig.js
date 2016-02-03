function getAccidentals() {
	var accidental = '';
	var sonority = 'M';

	// Find sonority
	if ($.inArray('m', score.key) != -1) {
		sonority = 'm';
	}

	// Find accidental
	if (score.key[1] == 'b') {
		accidental = 'b';
	} else if (score.key[1] == '#') {
		accidental = '#';
	}

	// Find the name of key (excluding sonority)
	var keyName = score.key[0] + accidental;

	// And Find and return accidentals in an array
	if (sonority == 'M') {
		var majorFlatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
		var majorSharpKeys = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];

		if ($.inArray(keyName, majorFlatKeys) != -1) {
			var flats = ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'];
			return flats.slice(0, $.inArray(keyName, majorFlatKeys) + 1);
		} else if ($.inArray(keyName, majorSharpKeys) != -1) {
			var sharps = ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'];
			return sharps.slice(0, $.inArray(keyName, majorSharpKeys) + 1);
		}
	// Do the same for minor keys
	} else {
		var minorFlatKeys = ['D', 'G', 'C', 'F', 'Bb', 'Eb', 'Ab'];
		var minorSharpKeys = ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#'];

		if ($.inArray(keyName, minorFlatKeys) != -1) {
			var flats = ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'];
			return flats.slice(0, $.inArray(keyName, minorFlatKeys) + 1);
		} else if ($.inArray(keyName, minorSharpKeys) != -1) {
			var sharps = ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'];
			return sharps.slice(0, $.inArray(keyName, minorSharpKeys) + 1);
		}
	}
}

function applyKeySigToChr(chr) {
    fchr = chr + 'b';
    schr = chr + '#'

    if ($.inArray(fchr, score.keyAccidentals) != -1) {
        return chr + 'b'
    } else if ($.inArray(schr, score.keyAccidentals) != -1) {
        return chr + '#';
    } else {
        return chr
    }
}

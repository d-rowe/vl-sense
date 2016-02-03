function replaceNote(x, y) {
	var newnote = yToNote(y);

	// Find closest note to the area clicked
	var closestid = [];
	var closestdist = 99;
	for (var i = 0; i < score.notes[x].length; i++) {
		var currentdist = Math.abs(y - score.notes[x][i].ypos)
		if (currentdist < closestdist) {
			closestdist = currentdist;
			closestid = i;
		}
	}
	
	score.notes[x][closestid] = yToNote(y);
	sortChord(x);

	idToVoice(x, closestid, newnote);

	// if (lastaddednote != '') {
	// 	lastaddednote.setStyle({ fillStyle: "black" });	
	// }


	// Find voice that needs to be changed
}

function idToVoice(x, id, note) {
	var clef = score.notes[x][id].clef;
	var otherID;

	for (var i = 0; i < score.notes[x].length; i++) {
		if (score.notes[x][i].clef == clef) {
			if (i != id) {
				otherID = i;
			}
		}
	};

	if (score.notes[x][id].key() > score.notes[x][otherID].key()) {
		
		if (clef == 'treble') {
			vexVoices.soprano[x] = createStaveNote(note, 1);
		} else {
			vexVoices.tenor[x] = createStaveNote(note, 1)
		}

	} else {
		if (clef == 'treble') {
			vexVoices.alto[x] = createStaveNote(note, -1)
		} else {
			vexVoices.bass[x] = createStaveNote(note, -1)
		}
	}

}
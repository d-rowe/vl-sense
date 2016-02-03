function sortStave(stave, id) {
    if (stave[id].length > 1) {
        if (getPos(stave[id][0]) > getPos(stave[id][1])) {
           stave[id].reverse();
        }
    }
}


// TODO Retain previous StaveNote information
function sortVoices(clef, id) {

	if (clef == 'treble') {
		if (vexVoices.alto[id].ghost == 'no') {
			var origS = vexVoices.soprano[id];
			var origA = vexVoices.alto[id];

			if (getPos(origA.keys[0]) > getPos(origS.keys[0])) {
				vexVoices.soprano[id] = origA.setStemDirection(1);
				vexVoices.alto[id] = origS.setStemDirection(-1);
			}
		}
	} else {
		if (vexVoices.tenor[id].ghost == 'no') {
			var origT = vexVoices.tenor[id];
			var origB = vexVoices.bass[id];

			if (getPos(origB.keys[0]) > getPos(origT.keys[0])) {
				vexVoices.tenor[id] = origB.setStemDirection(1);
				vexVoices.bass[id] = origT.setStemDirection(-1);
			}
		}
	}
}

function sortChord(id) {
	if (score.notes[id] !== undefined) {
		score.notes[id].sort(function (a, b) {
		 	if (a.key() > b.key()) {
		    	return 1;
			}
			if (a.key() < b.key()) {
		    	return -1;
			}
		  	// a must be equal to b
		  	return 0;
		});
	}
}
function pushNote(note, x) {
	var x = Math.abs(x);
	var clef = note.clef;

	// If the score is empty WORKING
	if (x > score.notes.length - 1) {
		score.notes.push([note]);
		if (clef == 'treble') {
			vexVoices.soprano.push(createStaveNote(note, 1));
			lastaddednote = vexVoices.soprano[x];
			fillGhost();
		} else {
			vexVoices.bass.push(createStaveNote(note, -1));
			lastaddednote = vexVoices.bass[x];
			fillGhost();
		}
	// If the score is NOT empty
	} else {

		if (clef == 'treble') {
			if (vexVoices.soprano[x].ghost == 'yes') {
				score.notes[x].push(note);
				vexVoices.soprano[x] = createStaveNote(note, 1);
				lastaddednote = vexVoices.soprano[x];
				fillGhost();
			} else if (vexVoices.alto[x].ghost == 'yes') {
				score.notes[x].push(note);
				vexVoices.alto[x] = createStaveNote(note, -1);
				lastaddednote = vexVoices.alto[x];
				fillGhost();
			} else {
				replaceNote(x, note.y);
			}

		} else {
			if (vexVoices.bass[x].ghost == 'yes') {
				score.notes[x].push(note);
				vexVoices.bass[x] = createStaveNote(note, -1);
				lastaddednote = vexVoices.bass[x];
				fillGhost();
			} else if (vexVoices.tenor[x].ghost == 'yes') {
				score.notes[x].push(note);
				vexVoices.tenor[x] = createStaveNote(note, 1);
				lastaddednote = vexVoices.tenor[x];
				fillGhost();
			} else {
				replaceNote(x, note.y);
			}
		}
	}
	reloadscore();
	playNote(note);
}


function createStaveNote(note, stem_direction) {
	var vexnote = note.vexnote;
	var notesci = note.scientific();
	var out = new Vex.Flow.StaveNote({ keys: [vexnote], duration: "q", stem_direction: stem_direction });
	// out.setStyle({ fillStyle: currentnotecolor });
	out['ghost'] = 'no';



	if (note.accidental() != '') {
		if ($.inArray(notesci[0]+notesci[1], score.keyAccidentals) == -1) {
			showAccidental();
		}
	}  else if ($.inArray(notesci[0]+'b', score.keyAccidentals) != -1)  {
		showAccidental();
	} else if ($.inArray(notesci[0]+'#', score.keyAccidentals) != -1) {
		showAccidental();
	}

	// if (lastaddednote != '') {
	// 	lastaddednote.setStyle({ fillStyle: "black" });	
	// }

	return out


	function showAccidental() {

		if (notesci[1] == 'b') {
			if (notesci[2] == 'b') {
				out.addAccidental(0, new Vex.Flow.Accidental("bb"));
			} else {
				out.addAccidental(0, new Vex.Flow.Accidental("b"));
			}
		} else if (notesci[1] == '#') {
			if (notesci[2] == '#') {
				out.addAccidental(0, new Vex.Flow.Accidental("##"));
			} else {
				out.addAccidental(0, new Vex.Flow.Accidental("#"));
			}
		} else {
			out.addAccidental(0, new Vex.Flow.Accidental("n"));
		}

	}
}

function createGhostNote() {
	var out = new Vex.Flow.GhostNote({ keys: ['C/4'], duration: "q" });
	out['ghost'] = 'yes';
	return out
}

function fillGhost() {
	var voices = [
		vexVoices.soprano,
		vexVoices.alto,
		vexVoices.tenor,
		vexVoices.bass
		];
	var longest = 0;

	for (var i = 0; i <= 3; i++) {
		if (voices[i].length > longest) {
			longest = voices[i].length;
		}
	}	

	for (var i = 0; i <= 3; i++) {
		while (voices[i].length < longest) {
			voices[i].push(createGhostNote());
		}
	}
}
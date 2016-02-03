function playNote(note) {
	var note = note.midi(); // the MIDI note
	var velocity = 127; // how hard the note hits
	var delay = 0; // play one note every quarter second
	// play the note
	MIDI.setVolume(0, 127);
	MIDI.noteOn(0, note, velocity, delay);
	MIDI.noteOff(0, note, delay + 0.75);
}

function playChord(id) {
	// console.log(id);
	var currkeys = []
	for (var i = 0; i < score.notes[id].length; i++) {
		// console.log(score.notes[id][i].scientific());
		currkeys.push(score.notes[id][i].midi());
	}

	MIDI.chordOn(0, currkeys, 127, 0);
}

function stopChord(id) {
	var currkeys = []
	for (var i = 0; i < score.notes[id].length; i++) {
		// console.log(score.notes[id][i].scientific());
		currkeys.push(score.notes[id][i].midi());
	}
	MIDI.chordOff(0, currkeys, getSecs());
}

function playScore() {
	playChord(0);
	stopChord(0);
	for (var x = 1; x < score.notes.length; x++) {
		playDelayedChord(x);
	}
}

function playDelayedChord(id) {
	setTimeout(function() {
		playChord(id);
		stopChord(id);
		}
	, getMills() * id);
}

$(document).ready(function() {
    $("#play").click(function() {
    	if (score.notes.length > 0) {
    		// score.tempo = $('#tempo').val();
        	playScore();
   		} else {
   			// alert('Nothing to play!');
   		}
    }); 
});

function getSecs() {
	return 60 / score.tempo
}

function getMills() {
	return (60 / score.tempo) * 1000
}

function drawPlaceHolder() {
	var placeHolder = ctx.rect(score.start_x - 5, 10, 20, 210, 10);	
}
function addNote(x, y) {

    var note = yToNote(y);

    pushNote(note, x);

    if (x > score.notes.length - 1) {
        x = score.notes.length - 1;
    }

    sortVoices(note.clef, x);
    sortChord(x);

    var voices = [
        vexVoices.soprano,
        vexVoices.alto,
        vexVoices.tenor,
        vexVoices.bass
    ]
    
    reloadscore();
}
function deleteScore() {
    ctx.paper.clear();
}

// BUG Breaks playback functionality
function clearScore() {
	deleteScore();
	resetScore();
}

$(document).ready(function() {
	$('#restart').click(function() {
	    if (confirm("Restarting will delete all of your previous work.  Are you sure you want to do this?") == true) {
	        clearScore();
	    }
	});
});
$(function() {
	$('#scorediv').mousemove(function(e) {
    	var yOffset = 35;
    	var parentOffset = $(this).offset();
	    var mouse = {
	        'x': Math.round(((((e.pageX - parentOffset.left) - yOffset) - score.start_x) / score.notegap) + 0.2 ),
	        'y': (e.pageY - parentOffset.top) - $("#scorediv").height()
	    };

	    if ((mouse.x > -1) && (mouse.x < score.idLength)) {
		    mouse.y = Math.round(mouse.y / (5 * score.zoom));
		    mouse.x = (mouse.x * score.notegap) + score.start_x + 23;
		    mouse.y += 46;
		    mouse.y *= (5 * score.zoom);

		    createHoverNote(mouse.x, mouse.y);
		} else {
			hoverNote.remove();
		}
	})

	$('#scorediv').mouseleave(function(e) {
    	if (hoverNote != '') {
    		hoverNote.remove();
    	}
	})
})


function createHoverNote(x, y) {
	// Center note better vertically
	// y += 1;

	// Remove last hoverNote if there is one
	if (hoverNote != '') {
		hoverNote.remove();
	}

	// Draw hoverNote
	hoverNote = ctx.paper.ellipse(x, y, 6, 5).attr(
		{fill:"#2E343D", stroke: "#2E343D"}
		).transform('r335');
}
function drawStaves() {
    var scorewidth = $('#scorediv').width();

    topStaff = new Vex.Flow.Stave(20, 5, (scorewidth/score.zoom) - 50);
    bottomStaff = new Vex.Flow.Stave(20, 115, (scorewidth/score.zoom) - 50);
    topStaff.addClef('treble');
    bottomStaff.addClef('bass');
    // Add key sig
    topStaff.addKeySignature(score.key);
    bottomStaff.addKeySignature(score.key);
    // Get start X position of blank staves
    score.start_x = (topStaff.start_x * score.zoom);
    var brace = new Vex.Flow.StaveConnector(topStaff, bottomStaff).setType(3);
    var lineLeft = new Vex.Flow.StaveConnector(topStaff, bottomStaff).setType(1);
    var lineRight = new Vex.Flow.StaveConnector(topStaff, bottomStaff).setType(7);
    brace.setContext(ctx).draw();
    lineLeft.setContext(ctx).draw();
    lineRight.setContext(ctx).draw();
    topStaff.setContext(ctx).draw();
    bottomStaff.setContext(ctx).draw();

    score.idLength = Math.floor(( $('#scorediv').width() - 50 - score.start_x) / score.notegap);

    repositionNumerals();

}
function drawVoices() {
    // Create a voice
    function createvoice() {
        return new Vex.Flow.Voice({
            // All voices should be same length, so just using soprano length for all voices
            num_beats: vexVoices.soprano.length,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });
    }

    // Create voices and add notes to each of them.
    var soprano = createvoice().addTickables(vexVoices.soprano);
    var alto = createvoice().addTickables(vexVoices.alto);
    var tenor = createvoice().addTickables(vexVoices.tenor);
    var bass = createvoice().addTickables(vexVoices.bass);

    // Format and justify the notes to 500 pixels
    var formatter = new Vex.Flow.Formatter();
    formatter.format([soprano, alto, tenor, bass], 
        ((score.notegap / score.zoom) * score.notes.length));
        
    // Sync NoteStartX between staves
    var max_x = Math.max(topStaff.getNoteStartX(), bottomStaff.getNoteStartX());
    topStaff.setNoteStartX(max_x);
    bottomStaff.setNoteStartX(max_x);

    // Render voice
    soprano.draw(ctx, topStaff);
    alto.draw(ctx, topStaff);
    tenor.draw(ctx, bottomStaff);
    bass.draw(ctx, bottomStaff);
}
$(function() {
	$('#natural').click( function() {
		if (nextAccidental == 'n') {
			nextAccidental = '';
			$(this).removeClass('accpressed');
		} else {
			nextAccidental = 'n';
			$(this).addClass('accpressed');
			$('#flat').removeClass('accpressed');
			$('#sharp').removeClass('accpressed');
		}
	});	

	$('#flat').click( function() {
		if (nextAccidental == 'b') {
			nextAccidental = '';
			$(this).removeClass('accpressed');
		} else {
			nextAccidental = 'b';
			$(this).addClass('accpressed');
			$('#natural').removeClass('accpressed');
			$('#sharp').removeClass('accpressed');
		}
	});

	$('#sharp').click( function() {
		if (nextAccidental == '#') {
			nextAccidental = '';
			$(this).removeClass('accpressed');
		} else {
			nextAccidental = '#';
			$(this).addClass('accpressed');
			$('#flat').removeClass('accpressed');
			$('#natural').removeClass('accpressed');
		}
	});
})


function applyAccidentalToChr(chr) {
	if (nextAccidental == 'n') {
		var out = chr
	} else {
		var out = chr + nextAccidental
	}
	// Reset accidental
	nextAccidental = '';
	$('#flat').removeClass('accpressed');
	$('#sharp').removeClass('accpressed');
	$('#natural').removeClass('accpressed');

	return out
}
function getNote(x, y) {
    return score.notes[x][y].scientific()
}

function getChord(x) {
	var out = []
	for (var i = 0; i < score.notes[x].length; i++) {
		out.push(score.notes[x][i].scientific());
	}
	return out
}
// FUTURE replace this with teoria's note.key()?
function getPos(note) {
    // Find number and use as octave
    var octave = note.match(/\d+/)[0];
    var notepos = {
        'C': 0,
        'D': 2,
        'E': 4,
        'F': 5,
        'G': 7,
        'A': 9,
        'B': 11
    }

    var pos = notepos[note[0]];
    pos += (octave * 12);
    if (note[1] == 'b') {
        pos -= 1;
    } else if (note[1] == '#') {
        pos += 1;
    }

    return pos;
}
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
function yToNote(y) {
// TODO clean

    // Set relative pos based on stave
    var trebleoffset = 4;
    var bassoffset = 3;

    if (y > 23) {
        var clef = 'treble';
        var relativey = y - trebleoffset;
    } else {
        var clef = 'bass';
        var relativey = y - bassoffset;
    }

    var chr = String.fromCharCode(65 + (relativey % 7));
    var octave = Math.round((relativey + 2) / 7);

    if (clef == 'bass') {
        octave += 3;
        nchr = String.fromCharCode(65 + ((relativey + 2) % 7));
        noct = Math.round((relativey + 4) / 7) + 1

        if (nextAccidental == '') {
            nchr = applyKeySigToChr(nchr);
        } else {
            nchr = applyAccidentalToChr(nchr);
        }

        var note = teoria.note(nchr + noct);
    } else {

        if (nextAccidental == '') {
            chr = applyKeySigToChr(chr);
        } else {
            chr = applyAccidentalToChr(chr);
        }

        var note = teoria.note(chr + octave);        
    }

    var vexnote = (chr + '/' + octave);
    note['y'] = y;
    note['clef'] = clef;
    note['vexnote'] = vexnote;
    note['ypos'] = y;
    return note;
}
// TODO Incorporate o

function correctNumeral(text) {

	var numeral = getNumeral()

	return numeral + getInversion();


	// TODO Make sure numeral is <= VII
	function getNumeral() {	
		var numeralPlaces = ['i', 'I', 'v', 'V'];
		var numeral = '';
		var numeralCase;

		for (var i = 0; i < text.length; i++) {
			var currentChr = text[i];

			if ($.inArray(currentChr, numeralPlaces) != -1) {
				if (numeral == '') {
					if (currentChr == currentChr.toUpperCase()) {
						numeralCase = 'Upper';
					} else {
						numeralCase = 'Lower';
					}
				}

				if (numeralCase == 'Upper') {
					numeral += text[i].toUpperCase();
				} else {
					numeral += text[i].toLowerCase();
				}
			}
		}

		return numeral;
	}


	function getInversion() {
		var inversionPlaces = ['6', '4'];
		var inversions = ['6', '64', '65', '43', '42'];
		var out = ''

		for (var i = numeral.length; i < text.length; i++) {
			var currentChr = text[i];

			if (i == numeral.length) {
				if ($.inArray(currentChr, inversionPlaces) != -1) {
					out = currentChr;

					if (i == text.length -1) {
						if (out == '6') {
							return out	
						} else {
							return ''
						}
					}

				} else {
					return ''
				}

			} else if ($.inArray(out + currentChr, inversions) != -1) {
					return out + currentChr
			} else {
				if (out == '4') {
					return ''
				} else {
					return out					
				}
			}
	
		}

		return '';

	}
}
function initNumerals() {

	for (var i = 0; i < score.idLength; i++) {
		var x = ((score.notegap * i) + score.start_x);
		x += 'px';
		$('#keyrns').append("<input type='text' class='numeral' maxlength='7'></input>");
		$('.numeral').last().css('left', x);
	}

	watchNumerals();
	
}

function repositionNumerals() {

	var numlen = $('.numeral').length;
	var idlen = score.idLength;

	if (numlen != idlen) {
		while (numlen > idlen) {
			$('.numeral').last().remove();
			numlen = $('.numeral').length;
		}

		while (numlen < idlen) {
			$('#keyrns').append("<input type='text' class='numeral' maxlength='7'></input>");
			numlen = $('.numeral').length;
		}
	}


	for (var i = 0; i < $('.numeral').length; i++) {
		var x = ((score.notegap * i) + score.start_x);
		x += 'px';
		$('.numeral').eq(i).css('left', x);
	}
}

function watchNumerals() {
	$(".numeral").change(function(){
		
		var numeral = $(this).val();
		var correct = correctNumeral(numeral);

		$(this).val(correct);
	});

	// $(".numeral").focusout(function(){

	// 	var x = $(this).css('left');

	// 	$(this).replaceWith("<span class='numeral'>Test</span>").css('left', x);	

	// 	$(this).css('left', x);

	// });
}
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
function flash(element, color) {
    var origcolor = $(element).css("background-color");
    $(element).animate({
        backgroundColor: jQuery.Color(color)
    }, 50 ).animate({
        backgroundColor: jQuery.Color(origcolor)
    }, 750 );
}
$(function() {
	resetScore();
})


function resetScore() {
	// TODO Change this to use id
	scorediv = $("div")[2];
	renderer = new Vex.Flow.Renderer(scorediv, 
		Vex.Flow.Renderer.Backends.RAPHAEL);

	ctx = renderer.getContext();

	$('#key').val('CM:');

	// Set global vars
	score = {
		'key': 'C', 'length': 125, 'start_x': 70, 'zoom': 1.25, 'notegap': 60, 'tempo': 60,
		'notes': [],
		'previouskey': 'CM:',
		'keyAccidentals': []
	};

	vexVoices = {
		'soprano': [],
		'alto': [],
		'tenor': [],
		'bass': []
	}
	nextAccidental = '';
	hoverNote = '';
	lastaddednote = '';
	currentnotecolor = 'blue';
	isplaying = false;

	ctx.scale(score.zoom, score.zoom);

	reloadscore();

	initNumerals();

	loadMIDI();
}

function loadMIDI() {
	MIDI.loadPlugin({
		soundfontUrl: "/static/soundfonts/",
		instrument: "acoustic_grand_piano",

		// onsuccess: function() {
		// 	console.log('MIDI fully loaded!');
		// 	console.log('------------------')
		// }
	});
}

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

$(function() {
	$('#scorediv').mousedown(function(e) {
      var yOffset = 35;
      var parentOffset = $(this).offset();
      var mouse = {
         'x': Math.round((((e.pageX - parentOffset.left) - yOffset) - score.start_x) / score.notegap),
         'y': $("#scorediv").height() - (e.pageY - parentOffset.top)
      };
      mouse.y = Math.round(mouse.y / (5 * score.zoom));

      if (mouse.x < score.idLength) {
         addNote(mouse.x, mouse.y);
      }
	})
})

function reloadscore() {
	deleteScore();
	drawStaves();
	drawVoices();
}
function resizescore() {
    // TODO page needs to resize as well as scores
    deleteScore();
    scorediv = $("div")[2];
	renderer = new Vex.Flow.Renderer(scorediv, 
	Vex.Flow.Renderer.Backends.RAPHAEL);
	ctx = renderer.getContext();
	ctx.scale(score.zoom, score.zoom);
    reloadscore();
};

var resizeTimer;
$(window).resize(function() {
	resizescore();
    // clearTimeout(resizeTimer);
    // resizeTimer = setTimeout(resizescore, 50);
});
$(document).ready(function() {
    $("#check").click(function() {

    	var notenames = getNoteNames();
    	var numerals = getNumerals();

		var out = {
			'key': score.key, 
			'numerals': [numerals], 
			'notenames': [notenames]
		};

		var request = {
			// Relpace with domain name when aquired
            url: "http://localhost:8000/api",
            crossDomain: true,
            type: 'PUT',
            contentType: "application/json",
            accepts: "application/json",
            cache: false,
            dataType: 'json',
            data: JSON.stringify(out),
        };

        $.ajax(request).done(function (data, textStatus, jqXHR) {
    		console.log({'request': out, 'response': data});
    	});

		function getNoteNames() {
	    	var notenames = [];
			for (var i = 0; i < score.notes.length; i++) {
				notenames.push(getChord(i));
			}
			return notenames;
    	}

    	function getNumerals() {
	    	var numerals = [];
			for (var i = 0; i < $('.numeral').length; i++) {
				var currentNumeral = $('.numeral').eq(i).val()

				if (currentNumeral == "") {
					numerals.push(null);

				} else {
					numerals.push($('.numeral').eq(i).val());	
				}	
			}

			for (var i = numerals.length - 1; i >= 0; i--) {
				if (numerals[i] == null) {
					numerals.pop()
				} else {
					i = -1;
				}
			};

			return numerals;
    	}
    });
});
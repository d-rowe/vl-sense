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

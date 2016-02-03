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
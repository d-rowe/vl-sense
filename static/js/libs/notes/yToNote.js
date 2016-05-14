function yToNote(y) {
// TODO clean

    // Set relative pos based on stave
    var trebleoffset = -2;
    var bassoffset = -3;

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
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
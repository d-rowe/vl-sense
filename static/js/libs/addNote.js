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
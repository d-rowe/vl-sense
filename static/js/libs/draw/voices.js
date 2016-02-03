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
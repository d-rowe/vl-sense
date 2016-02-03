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
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
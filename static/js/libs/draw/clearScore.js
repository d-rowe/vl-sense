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
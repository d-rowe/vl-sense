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
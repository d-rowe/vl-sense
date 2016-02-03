$(function() {
	$('#scorediv').mousedown(function(e) {
      var yOffset = 35;
      var parentOffset = $(this).offset();
      var mouse = {
         'x': Math.round((((e.pageX - parentOffset.left) - yOffset) - score.start_x) / score.notegap),
         'y': $("#scorediv").height() - (e.pageY - parentOffset.top)
      };
      mouse.y = Math.round(mouse.y / (5 * score.zoom));

      if (mouse.x < score.idLength) {
         addNote(mouse.x, mouse.y);
      }
	})
})

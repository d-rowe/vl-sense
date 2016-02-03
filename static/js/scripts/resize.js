function resizescore() {
    // TODO page needs to resize as well as scores
    deleteScore();
    scorediv = $("div")[2];
	renderer = new Vex.Flow.Renderer(scorediv, 
	Vex.Flow.Renderer.Backends.RAPHAEL);
	ctx = renderer.getContext();
	ctx.scale(score.zoom, score.zoom);
    reloadscore();
};

var resizeTimer;
$(window).resize(function() {
	resizescore();
    // clearTimeout(resizeTimer);
    // resizeTimer = setTimeout(resizescore, 50);
});
function flash(element, color) {
    var origcolor = $(element).css("background-color");
    $(element).animate({
        backgroundColor: jQuery.Color(color)
    }, 50 ).animate({
        backgroundColor: jQuery.Color(origcolor)
    }, 750 );
}
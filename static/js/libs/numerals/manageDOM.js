function initNumerals() {

	for (var i = 0; i < score.idLength; i++) {
		var x = ((score.notegap * i) + score.start_x);
		x += 'px';
		$('#keyrns').append("<input type='text' class='numeral' maxlength='7'></input>");
		$('.numeral').last().css('left', x);
	}

	watchNumerals();
	
}

function repositionNumerals() {

	var numlen = $('.numeral').length;
	var idlen = score.idLength;

	if (numlen != idlen) {
		while (numlen > idlen) {
			$('.numeral').last().remove();
			numlen = $('.numeral').length;
		}

		while (numlen < idlen) {
			$('#keyrns').append("<input type='text' class='numeral' maxlength='7'></input>");
			numlen = $('.numeral').length;
		}
	}


	for (var i = 0; i < $('.numeral').length; i++) {
		var x = ((score.notegap * i) + score.start_x);
		x += 'px';
		$('.numeral').eq(i).css('left', x);
	}
}

function watchNumerals() {
	$(".numeral").change(function(){
		
		var numeral = $(this).val();
		var correct = correctNumeral(numeral);

		$(this).val(correct);
	});

	// $(".numeral").focusout(function(){

	// 	var x = $(this).css('left');

	// 	$(this).replaceWith("<span class='numeral'>Test</span>").css('left', x);	

	// 	$(this).css('left', x);

	// });
}
$(document).ready(function() {
    $("#check").click(function() {

    	var notenames = getNoteNames();
    	var numerals = getNumerals();

		var out = {
			'key': score.key, 
			'numerals': numerals, 
			'notenames': notenames
		};



		var request = {
            url: "http://localhost:8000/api",
            crossDomain: true,
            type: 'PUT',
            contentType: "application/json",
            accepts: "application/json",
            cache: false,
            dataType: 'json',
            data: JSON.stringify(out),
        };

        $.ajax(request).done(function (data, textStatus, jqXHR) {
    		console.log({'request': out, 'response': data});
    	});




		function getNoteNames() {
	    	var notenames = [];
			for (var i = 0; i < score.notes.length; i++) {
				notenames.push(getChord(i));
			}
			return notenames;
    	}

    	function getNumerals() {
	    	var numerals = [];
			for (var i = 0; i < $('.numeral').length; i++) {
				var currentNumeral = $('.numeral').eq(i).val()

				if (currentNumeral == "") {
					numerals.push(null);

				} else {
					numerals.push($('.numeral').eq(i).val());	
				}	
			}

			for (var i = numerals.length - 1; i >= 0; i--) {
				if (numerals[i] == null) {
					numerals.pop()
				} else {
					i = -1;
				}
			};

			return numerals;
    	}
    });
});
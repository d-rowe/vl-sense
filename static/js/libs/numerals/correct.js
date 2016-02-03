// TODO Incorporate o

function correctNumeral(text) {

	var numeral = getNumeral()

	return numeral + getInversion();


	// TODO Make sure numeral is <= VII
	function getNumeral() {	
		var numeralPlaces = ['i', 'I', 'v', 'V'];
		var numeral = '';
		var numeralCase;

		for (var i = 0; i < text.length; i++) {
			var currentChr = text[i];

			if ($.inArray(currentChr, numeralPlaces) != -1) {
				if (numeral == '') {
					if (currentChr == currentChr.toUpperCase()) {
						numeralCase = 'Upper';
					} else {
						numeralCase = 'Lower';
					}
				}

				if (numeralCase == 'Upper') {
					numeral += text[i].toUpperCase();
				} else {
					numeral += text[i].toLowerCase();
				}
			}
		}

		return numeral;
	}


	function getInversion() {
		var inversionPlaces = ['6', '4'];
		var inversions = ['6', '64', '65', '43', '42'];
		var out = ''

		for (var i = numeral.length; i < text.length; i++) {
			var currentChr = text[i];

			if (i == numeral.length) {
				if ($.inArray(currentChr, inversionPlaces) != -1) {
					out = currentChr;

					if (i == text.length -1) {
						if (out == '6') {
							return out	
						} else {
							return ''
						}
					}

				} else {
					return ''
				}

			} else if ($.inArray(out + currentChr, inversions) != -1) {
					return out + currentChr
			} else {
				if (out == '4') {
					return ''
				} else {
					return out					
				}
			}
	
		}

		return '';

	}
}
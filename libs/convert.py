from music21 import pitch, chord, stream, key, roman

def convert(json):
	skey = json['key']
	dkey = key.Key(skey)
	numerals = json['numerals']
	dchords = getChords(json)


	return {
    	# 'title': title,
        'key': dkey,
        'skey': skey,
        # 'chords': chords,
        'dchords': dchords,
        # 'romans': rns,
        # 'figures': figures,
        # 'voices': {
            # 'bass': bass,
            # 'tenor': tenor,
            # 'alto': alto,
            # 'soprano': soprano
        # },
        # 'data': insong
    }



def getChords(json):
 	chords = []
	rawChords = json['notenames']

	for rawChord in rawChords:
		chordList = []
		for rawNote in rawChord:

			mnote = pitch.Pitch(rawNote)
			chordList.append(mnote)
			

		chords.append(chord.Chord(chordList))

	return chords
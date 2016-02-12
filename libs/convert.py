from music21 import pitch, chord, stream, key, roman
from libs import *

def convert(json):
	skey = json['key']
	dkey = key.Key(skey.replace('b', '-'))
	numerals = json['numerals']
	dchords = getChords(json)
	chords = dchords # Dumb, get ride of chords

	rns = []
	for numeral in numerals:
		crn = roman.RomanNumeral(numeral, dkey)
		rns.append(crn)

	figures = []
	for i in rns:
		figures.append(i.figure)


	bass, tenor, alto, soprano = [], [], [], []
	for x in range(len(dchords)):
		for y in range(len(dchords[x])):
			if y == 0:
				bass.append(dchords[x][y])
			elif y == 1:
				tenor.append(dchords[x][y])
			elif y == 2:
				alto.append(dchords[x][y])
			elif y == 3:
				soprano.append(dchords[x][y])

	return {
        'key': dkey,
        'skey': skey,
        'chords': chords,
        'dchords': dchords,
        'romans': rns,
        'figures': figures,
        'voices': {
            'bass': bass,
            'tenor': tenor,
            'alto': alto,
            'soprano': soprano
        },
        # 'data': insong
    }


def getChords(json):
 	chords = []
	rawChords = json['notenames']

	# Check to see that there is at least a note
	if (rawChords != [[u'Ab-1']]):

		for rawChord in rawChords:
			chordList = []
			for rawNote in rawChord:
				rawNote = rawNote.replace('b', '-')
				mnote = pitch.Pitch(rawNote)
				chordList.append(mnote)
				
			chords.append(chord.Chord(chordList))

		return chords

	else:
		return
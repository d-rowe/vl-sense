from music21 import note, chord, stream, key, roman

def convert(json):
	for key in json.keys():
		print(json[key])
########################################
# libs/vlparse.py
#   Parses music file and translates to
#   dictionary of relevent information
#
# Copyright 2015 Daniel Rowe
########################################


# TODO only import needed modules from music21
# TODO if only one note in stave, set both voices to it

from music21 import *


def getdata(songlocation):
    # convert file to stream
    insong = converter.parse(songlocation)

    # get title of song
    title = str(insong.getElementsByClass(text.TextBox)[0].content)

    # analyze song for key
    skey = insong.analyze('key')

    # format key (e.g. C major -> C)
    if 'major' in str(skey):
        skey = str(skey).replace(' major', '').upper()
    else:
        skey = str(skey).replace(' minor', '').lower()

    # change dkey from string to key type
    dkey = key.Key(skey)

    # flatten stream data
    inchorddata = insong.chordify().flat

    # get voices
    stavechords = []
    bass, tenor, alto, soprano = [], [], [], []
    for element in insong.flat:
        if 'chord' in str(element):
            stavechords.append(element)
    for i in range(len(stavechords)):
        if i % 2 == 0:
            alto.append(stavechords[i][0])
            soprano.append(stavechords[i][1])
        else:
            bass.append(stavechords[i][0])
            tenor.append(stavechords[i][1])

    # find chords and roman numerals
    chords, rns = [], []
    for element in inchorddata:
        if 'chord' in str(element):
            currentchord = chord.Chord(element)
            chords.append(currentchord)
            crn = roman.romanNumeralFromChord(currentchord, dkey)
            rns.append(crn)

    dchords = []
    for i in range(len(chords)):
        dchords.append(chord.Chord((bass[i], tenor[i], alto[i], soprano[i])))

    figures = []
    for i in rns:
        figures.append(i.figure)

    return {
        'title': title,
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
        'data': insong
    }

# TODO only import needed modules
# TODO move to libs/
from music21 import note, chord, stream, key, roman

def parse(indat):
    info = chordstream(indat)
    songData = info['stream']
    chords = info['chords']
    dchords = chords
    # TODO change flats to 'es'
    skey = indat['key'].encode('ascii')
    dkey = key.Key(skey)

    voices = chords2voices(chords)

    rns, figures = [],[]
    for chrd in chords:
        crn = roman.romanNumeralFromChord(chrd, dkey)
        rns.append(crn)
        figures.append(crn.figure)




    return {
        'skey': skey,
        'dkey': dkey,
        'chords': chords,
        'dchords': dchords,
        'romans': rns,
        'figures': figures,
        'voices': voices
        }


def chordstream(indict):
    outstream = stream.Stream()
    outchords = []

    for chrd in indict['chords']:
        currentchord = chord.Chord(chrd)
        outchords.append(currentchord)
        outstream.append(currentchord)


    return {
        'stream': outstream,
        'chords': outchords
    }

def chords2voices(inchord):
    voices = {0: 'bass', 1: 'tenor', 2: 'alto', 3: 'soprano'}
    bass, tenor, alto, soprano = [],[],[],[]
    for chrd in inchord:
        for i in range(len(chrd)):
            nte = chrd[i]
            try:
                currentvoice = voices[i]
            except:
                print('only using first four voices!')

            if currentvoice == 'bass':
                bass.append(nte)
            if currentvoice == 'tenor':
                tenor.append(nte)
            if currentvoice == 'alto':
                alto.append(nte)
            if currentvoice == 'soprano':
                soprano.append(nte)

    return {
        'bass': bass,
        'tenor': tenor,
        'alto': alto,
        'soprano': soprano
    }
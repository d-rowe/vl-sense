###################################
# libs/errorlibs/parallelmotion.py
# Copyright 2015 Daniel Rowe
###################################


from collections import Counter
from music21 import interval
from readabilitylibs import *

# TODO differenciate perfect and inequal fifths
# TODO if parallel fifths don't move, don't count them
# TODO CLEAN AND COMMENT, hard to read (i know, i get it)
# TODO CHECK FOR OCTAVE!


def checkparallelmotion(songdata):
    # Here's where we'll put the errors we find
    errors = []
    # Get relevent data about this song
    chords, voices, romans = (
        songdata['chords'], songdata['voices'], songdata['romans']
    )

    voicetext = [
        'bass and tenor', 'bass and alto', 'bass and soprano',
        'tenor and alto', 'tenor and soprano', 'alto and soprano'
    ]

    bass, tenor, alto, soprano = (
        voices['bass'], voices['tenor'], voices['alto'], voices['soprano']
    )

    permutations = (
        (bass, tenor), (bass, alto), (bass, soprano),
        (tenor, alto), (tenor, soprano),
        (alto, soprano)
    )

    # List to store found fifths
    fifths, simplefifths = ([], [])
    octaves, simpleoctaves = ([], [])
    unisons, simpleunisons = ([], [])
    # Scroll through each chord, with counter i
    for i in range(len(chords)):
        # Add new entry list in fifths list
        fifths.append([])
        simplefifths.append([])
        octaves.append([])
        simpleoctaves.append([])
        unisons.append([])
        simpleunisons.append([])
        # Scroll through each permutation, with counter x
        for x in range(len(permutations)):

            ######################################
            # Gather information on current chord
            ######################################

            # Get the currently paired notes
            pair = permutations[x]
            # Find the simplified interval between the paired notes
            _interval = interval.notesToInterval(pair[0][i], pair[1][i])
            # Find the staff distance apart
            name = _interval.generic.semiSimpleUndirected
            # Find the simplified staff distance apart
            simplename = _interval.generic.simpleUndirected
            _typename = _interval.simpleName
            # Boolean of if the interval is perfect
            perfect = 'P' in _typename

            ###############################################
            # Indentify and add wanted intervals to fifths
            ###############################################

            # Current pair is a fifth apart
            if simplename == 5:
                fifth = ParallelInterval(i, x, 5, perfect, pair[0][i], pair[1][i])
                fifths[i].append(fifth)
                simplefifths[i].append(x)
            # Current pair is an octave(s) apart
            elif (simplename == 1) and (name != 1):
                octave = ParallelInterval(i, x, 8, perfect, pair[0][i], pair[1][i])
                octaves[i].append(octave)
                simpleoctaves[i].append(x)
            # Current pair is a unison
            elif (simplename == 1) and (name == 1):
                unison = ParallelInterval(i, x, 1, perfect, pair[0][i], pair[1][i])
                unisons[i].append(unison)
                simpleunisons[i].append(x)


    # Check for two parralel fifth pairs next to eachother
    for i in range(len(fifths) - 1):
        combined = simplefifths[i] + simplefifths[i + 1]
        pfifths = [k for k, v in Counter(combined).items() if v > 1]
        for pfifth in pfifths:
            errors.append(
                '{0} to {1} chord ({2} -> {3}): Parallel fifth between {4}'.format(
                    ordinal(i + 1),
                    ordinal(i + 2),
                    romans[i].figure,
                    romans[i + 1].figure,
                    voicetext[pfifth]
                )
            )

    # Check for two parralel octave pairs next to eachother
    for i in range(len(octaves) - 1):
        combined = simpleoctaves[i] + simpleoctaves[i + 1]
        poctaves = [k for k, v in Counter(combined).items() if v > 1]
        for poctave in poctaves:
            errors.append(
                '{0} to {1} chord ({2} -> {3}): Parallel octave between {4}'.format(
                    ordinal(i + 1),
                    ordinal(i + 2),
                    romans[i].figure,
                    romans[i + 1].figure,
                    voicetext[poctave]
                )
            )

    # Check for two parralel unison pairs next to eachother (UNTESTED)
    for i in range(len(unisons) - 1):
        combined = simpleunisons[i] + simpleunisons[i + 1]
        punisons = [k for k, v in Counter(combined).items() if v > 1]
        for punison in punisons:
            errors.append(
                '{0} to {1} chord ({2} -> {3}): Parallel unison between {4}'.format(
                    ordinal(i + 1),
                    ordinal(i + 2),
                    romans[i].figure,
                    romans[i + 1].figure,
                    voicetext[punison]
                )
            )

    return errors


class ParallelInterval():
    def __init__(self, chordnum, permnum, intrvl, perfect, noteone, notetwo):
        self.x = chordnum
        self.y = permnum
        self.interval = intrvl
        self.perfect = perfect
        self.notes = (noteone, notetwo)
        self.notenames = noteone.name, notetwo.name


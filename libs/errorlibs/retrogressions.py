################################
# libs/errorlibs/regressions.py
#   Checks for retrogressions
#   in chord progression
#
# Copyright 2015 Daniel Rowe
################################

# TODO Look for ascending 3rd or descending 5th root movement
# TODO Identify circle of fifth progressions
# TODO Find errors in circle of fifths progression

from readabilitylibs import *
from music21 import *


def checkretrogressions(songdata):

    # TODO check for more retrogressions

    errors = []
    numeralfunctions = {
        1: 'tonic',
        2: 'predominant',
        3: 'predominant',
        4: 'predominant',
        5: 'dominant',
        6: 'predominant',
        7: 'dominant'
    }
    romans = songdata['romans']

    for i in range(len(romans) - 1):
        currentdegree = romans[i].scaleDegree
        nextdegree = romans[i + 1].scaleDegree
        currentfunction = numeralfunctions[currentdegree]
        nextfunction = numeralfunctions[nextdegree]

        # Check if a dominant moves directly to a predominant
        if (currentfunction == 'dominant') and (nextfunction == 'predominant'):
            # Add error if this is NOT a deceptive cadence
            if not ((currentdegree == 5) and (nextdegree == 6)):
                errors.append(
                    '{0} to {1} chord ({2} -> {3}): dominant to predominant motion'.format(
                        ordinal(i + 1),
                        ordinal(i + 2),
                        romans[i + 1].figure,
                        romans[i + 2].figure
                    )
                )
    print(circleoffifthsindex(songdata))
    return errors

# TODO move this into vlparse?


def circleoffifthsindex(songdata):
    # example index = [(0, 5), (7, 9)].  These are start and end positions of circle of fifth movements
    index = {}
    roots = []
    inversions = []

    # Find roots of each chord
    for chrd in songdata['chords']:
        roots.append(note.Note(chrd.root().name))
        inversions.append(chrd.inversionName())


    for i in range(len(roots) - 1):
        currentroot = note.Note(roots[i].name + '4')  # Put the first note higher than the second
        nextroot = note.Note(roots[i + 1].name + '3')
        intrvl = interval.notesToInterval(currentroot, nextroot).generic.semiSimpleUndirected
        index[i] = intrvl == 5  # If intrvl is 5 than set index[i] to True


    start = 0
    cofindex = []
    while True:
        for s in range(start, len(index.keys())):
            current = index[index.keys()[s]]
            if current:
                start = s
                break

        for e in range(s + 1, len(index.keys())):
            current = index[index.keys()[e]]
            if not current:
                start = e
                break

        if e - s >= 2:  # Check if there are at least 3 chords in a cof pattern
            currenttuple = (s + 1, e + 1)
            cofindex.append(currenttuple)


        if e >= len(index.keys()) - 1:
            break

    return cofindex

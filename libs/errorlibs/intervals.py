########################################
# libs/errorlibs/intervals.py
#   Checks for leaps and augmented 2nds
#   within each voice
#
# Copyright 2015 Daniel Rowe
########################################

from music21 import interval
from readabilitylibs import *


def checkintervals(songdata):
    voices = songdata['voices']
    errors = []

    for currentvoice in voices.keys():
        # Lists through all voices (e.g. bass, tenor, alto, soprano)
        for i in range(len(voices[currentvoice]) - 1):
            # List through all notes in current voice
            currentnote = voices[currentvoice][i]
            nextnote = voices[currentvoice][i + 1]
            currentinterval = interval.notesToInterval(currentnote, nextnote)
            if (abs(currentinterval.generic.staffDistance) > 2) and (currentvoice != 'bass'):
                errors.append(
                    '{0} {1} note ({2}): Leap of more than a third'.format(
                        ordinal(i + 2), currentvoice, readablenote(voices[currentvoice][i + 1])
                    )
                )

            elif currentinterval.name == 'A2':
                errors.append(
                    '{0} {1} note ({2}): Augmented 2nd'.format(
                        ordinal(i + 2), currentvoice, readablenote(voices[currentvoice][i + 1])
                    )
                )

    return errors


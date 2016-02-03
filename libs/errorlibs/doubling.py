###############################
# libs/errorlibs/doubling.py
#   Checks for doubling errors
#
# Copyright 2015 Daniel Rowe
###############################


from collections import Counter
from music21 import *
from readabilitylibs import *


def checkdoubling(songdata):
    errors = []
    dchords = songdata['dchords']
    rns = songdata['romans']

    for i in range(len(dchords)):

        ###############################################################
        # Find doubling                                               #
        #                                                             #
        #   all needed(?) information about the current chord (i + 1) #
        #   is stored in dictionary "current"                         #
        ###############################################################
        currentchord = dchords[i]
        current = {
            'chord': currentchord,
            'root': currentchord.root().name,
            'roman': rns[i],
            'inversionname': currentchord.inversionName(),
            'inversion': currentchord.inversion(),
            'figure': rns[i].figure
        }

        _notenames = []
        for nte in current['chord']:
            _notenames.append(str(nte.name))
        freqnotes = Counter(_notenames)
        dnote = [j for j in freqnotes if freqnotes[j] > 1]
        if len(dnote) > 0:
            dnote = dnote[0]
            current['doubling'] = interval.Interval(
                note.Note(current['root'] + '0'), note.Note(dnote + '1')
            ).generic.semiSimpleUndirected
            # Simplify interval (Eg. 9 to 2)
            while current['doubling'] > 7:
                current['doubling'] -= 7


        ##############################################################
        #                       Check doubling                       #
        ##############################################################

        # Check that all 64 chords double fifth
        if (current['inversionname'] == 64) and (current['doubling'] != 5):
            errors.append(
                'Chord {0} ({1}): Fifth should be doubled because it is a 64 chord'.format(
                    i + 1, current['figure']
                )
            )

        # Check that all dim triads double third
        elif current['chord'].isDiminishedTriad() and (current['doubling'] != 3):
            errors.append(
                '{0} chord ({1}): Third should be doubled because it is a dimished triad'.format(
                    ordinal(i + 1), current['figure']
                )
            )

        # Check that deceptive cadence (5 -> 6) doubles third
        elif (i > 0) and (rns[i - 1].scaleDegree == 5) and (rns[i].scaleDegree == 6) and (current['doubling'] != 3):
            errors.append(
                '{0} chord ({1}): Third should be doubled because this is a deceptive cadence'.format(
                    ordinal(i + 1), current['figure']
                )
            )

    return errors

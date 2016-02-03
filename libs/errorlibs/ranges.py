#############################
# libs/errorlibs/ranges.py
#   Checks for notes outside
#   of their given voice
#
# Copyright 2015 Daniel Rowe
#############################


from readabilitylibs import *


def checkranges(songdata):
    voices = songdata['voices']

    ranges = {
        'bass': (40, 64),
        'tenor': (48, 72),
        'alto': (55, 79),
        'soprano': (60, 84)
    }

    errors = []

    for currentvoice in voices.keys():
        # Lists through all voices (e.g. bass, tenor, alto, soprano)

        for i in range(len(voices[currentvoice])):
            # List through all notes in current voice

            currentnoteps = voices[currentvoice][i].ps
            if currentnoteps < ranges[currentvoice][0]:
                errors.append(
                    '{0} {1} note: Too low'.format(
                        ordinal(i + 1),
                        currentvoice
                    )
                )
            if currentnoteps > ranges[currentvoice][1]:
                errors.append(
                    '{0} {1} note: Too high'.format(
                        ordinal(i + 1),
                        currentvoice
                    )
                )

    return errors

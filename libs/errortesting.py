#############################
# libs/errortesting.py
#   Retrieves all errors
#
# Copyright 2015 Daniel Rowe
#############################

from errorlibs import *

# TODO do these recursively for all modules in errorlibs
# TODO put these on different threads?


def geterrors(songdata):
    return {
        'Voice Ranges': checkranges(songdata),
        'Tendency Tones': checktendencies(songdata),
        'Intervals': checkintervals(songdata),
        'Parallel Motion': checkparallelmotion(songdata),
        'Doubling': checkdoubling(songdata),
        #'Retrogressions': checkretrogressions(songdata),
        # 'Inversions': checkinversions(songdata)
    }

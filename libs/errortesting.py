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
    errors = {
        'Voice Ranges': checkranges(songdata),
        'Tendency Tones': checktendencies(songdata),
        'Intervals': checkintervals(songdata),
        'Parallel Motion': checkparallelmotion(songdata),
        'Doubling': checkdoubling(songdata),
        #'Retrogressions': checkretrogressions(songdata),
        # 'Inversions': checkinversions(songdata)
    }

    out = {}
    for key in errors.keys():
    	if errors[key] != []:
    		out[key] = errors[key]

    return out
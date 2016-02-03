#############################################
# libs/errorlibs/readibilitylibs/ordinals.py
#   Returns ordinal for given number
#
# Copyright 2015 Daniel Rowe
#############################################


def ordinal(num):
    suffixes = {1: 'st', 2: 'nd', 3: 'rd'}
    if 10 <= num % 100 <= 20:
        suffix = 'th'
    else:
        suffix = suffixes.get(num % 10, 'th')

    return str(num) + suffix

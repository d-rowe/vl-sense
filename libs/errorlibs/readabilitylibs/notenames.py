##############################################
# libs/errorlibs/readibilitylibs/notenames.py
#   Translates music21 letter notation to
#   human readable letter notation
#
# Copyright 2015 Daniel Rowe
##############################################


def readablenote(note):
    return note.name.replace('-', 'b')

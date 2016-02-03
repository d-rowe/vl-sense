###############################
# libs/errorlibs/tendencies.py
#   Checks for unresolved
#   tendency tones
#
# Copyright 2015 Daniel Rowe
###############################


from music21 import scale
from readabilitylibs import *


def checktendencies(songdata):
    skey, allvoices = songdata['skey'], songdata['voices']
    if skey.islower():
        refscale = scale.MinorScale(skey)
    else:
        refscale = scale.MajorScale(skey)

    do, me, fa, ti = (
        refscale.pitches[0].name, refscale.pitches[2].name,
        refscale.pitches[3].name, scale.MajorScale(skey).pitches[6].name
    )

    errors = []
    for voice in allvoices.keys():
        for i in range(len(allvoices[voice]) - 1):
            currentnote = allvoices[voice][i].name
            nextnote = allvoices[voice][i + 1].name
            if (currentnote == ti) and (nextnote != ti and nextnote != do):
                if voice == ('soprano' or 'bass'):
                    errors.append(
                        '{0} {1} note ({2}): Frustrated leading tone in outer voice'.format(
                            ordinal(i + 2),
                            voice,
                            readablenote(songdata['voices'][voice][i + 1])
                        )
                    )
            if (currentnote == fa) and ((nextnote != fa) and (nextnote != me)):
                errors.append(
                    '{0} {1} note ({2}): Frustrated fa'.format(
                        ordinal(i + 2),
                        voice,
                        readablenote(songdata['voices'][voice][i + 1])
                    )
                )

    return errors

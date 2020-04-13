#!/usr/bin/env bash

################################################
# Naive test script for loghog
#
# Usage:
# ./test.sh -> returns a list of files
# ./test.sh <my-filename> -> returns the file contents
#
################################################

set -e -u

ARG=${1:-}

curl http://localhost:3000/files

if [ -n $ARG ]; then
    curl http://localhost:3000/files/$ARG
fi

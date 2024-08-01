#!/bin/bash

# Check if the existing submissions.json file exists and back it up
if [ -f ./data/submissions.json ]; then
    cp ./data/submissions.json ./data/submissions.json.bak
fi

# Pull the latest changes from the main branch
git fetch origin
git reset --hard origin/main

# Restore the backed-up submissions.json file
if [ -f ./data/submissions.json.bak ]; then
    mv ./data/submissions.json.bak ./data/submissions.json
fi

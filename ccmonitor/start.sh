#!/bin/bash

export PORT=5108

cd ~/www/ccmonitor
./bin/ccmonitor stop || true
./bin/ccmonitor start

cd ~/cs5610-project-2/node-client
node js/app.js


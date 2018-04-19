#!/bin/bash

export PORT=5108

cd ~/www/ccmonitor
./bin/ccmonitor stop || true
./bin/ccmonitor start



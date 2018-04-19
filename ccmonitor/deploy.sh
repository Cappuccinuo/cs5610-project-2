#!/bin/bash

export PORT=5108
export MIX_ENV=prod
export GIT_PATH=/home/ccmonitor/cs5610-project-2/ccmonitor

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/ccmonitor ]; then
	echo mv ~/www/ccmonitor ~/old/$NOW
	mv ~/www/ccmonitor ~/old/$NOW
fi

mkdir -p ~/www/ccmonitor
REL_TAR=~/cs5610-project-2/ccmonitor/_build/prod/rel/ccmonitor/releases/0.0.1/ccmonitor.tar.gz
(cd ~/www/ccmonitor && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/ccmonitor/cs5610-project-2/start.sh
CRONTAB

#. start.sh
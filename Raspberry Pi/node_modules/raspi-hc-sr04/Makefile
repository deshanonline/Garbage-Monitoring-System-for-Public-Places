IP?=192.168.0.137
ROOT?=raspi-hc-sr04
SHELL=/bin/bash -eo pipefail

sync:
	@rsync . pi@${IP}:~/${ROOT} -r --verbose --exclude=node_modules --exclude=.git

install:
	ssh pi@${IP} " \
		cd ${ROOT}; \
			npm install"

build:
	ssh pi@${IP} " \
		 cd ${ROOT}; \
		 npm run build"

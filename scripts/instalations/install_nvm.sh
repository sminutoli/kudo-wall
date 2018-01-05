#!/usr/bin/env bash
# Installs the Node Version Manager (https://github.com/creationix/nvm)

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# Load nvm for the current script
export NVM_DIR="/home/vagrant/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

export NODE_VERSION='8'
nvm install $NODE_VERSION
nvm alias default $NODE_VERSION

# Install global packages
npm install -g nodemon
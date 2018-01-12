#!/usr/bin/env bash
set -e

echo "Empezando provisionamiento"

# Install core components
/vagrant/scripts/instalations/install_build_tools.sh

# Install network host
/vagrant/scripts/instalations/install_network.sh

# Install mongo
/vagrant/scripts/instalations/install_mongodb.sh

# Install node
su vagrant -c "/vagrant/scripts/instalations/install_nvm.sh"

# Install yarn
/vagrant/scripts/instalations/install_yarn.sh

echo "--------------------------------------------------"
echo "(Y)"

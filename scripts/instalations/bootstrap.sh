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
<<<<<<< HEAD
/vagrant/scripts/instalations/install_nvm.sh
=======
su vagrant -c "/vagrant/scripts/instalations/install_nvm.sh"
>>>>>>> 2db5aab... Vagrant!

# Install yarn
/vagrant/scripts/instalations/install_yarn.sh

echo "--------------------------------------------------"
echo "(Y)"

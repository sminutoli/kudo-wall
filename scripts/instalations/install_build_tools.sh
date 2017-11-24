#!/usr/bin/env bash
# Installs build tool essentials

echo "set grub-pc/install_devices /dev/sda" | debconf-communicate

apt-get -y -qq update
apt-get -y -qq upgrade

<<<<<<< HEAD
# apt-get install -y make g++ libcairo2-dev libav-tools
apt-get install -y build-essential git curl vim nfs-common portmap htop ca-certificates
=======
apt-get install -y build-essential git curl vim nfs-common portmap htop ca-certificates libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
>>>>>>> 2db5aab... Vagrant!

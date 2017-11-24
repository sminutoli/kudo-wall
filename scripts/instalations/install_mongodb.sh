#!/usr/bin/env bash
# Installs Mongo

mkdir -p /data/db
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb-org

<<<<<<< HEAD
chmod +777 /var/lib/mongodb

mv /vagrant/scripts/services/mongodb.service /etc/mongod.conf
=======
mv /vagrant/scripts/config/mongod.conf /etc/mongod.conf
>>>>>>> 2db5aab... Vagrant!
service mongod restart
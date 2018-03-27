#!/usr/bin/env bash
# Installs Mongo

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb-org

mkdir -p /var/run/mongodb /var/log/mongodb /var/lib/mongo
touch /var/run/mongodb/mongod.pid
chmod 777 /var/run/mongodb/mongod.pid 


cp /vagrant/scripts/config/mongod.conf /etc/mongod.conf
service mongod restart
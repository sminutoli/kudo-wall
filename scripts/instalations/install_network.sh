#!/usr/bin/env bash
BOX_NAME='node-vagrant'
# Change the hostname so we can easily identify what environment we're on:
echo "$BOX_NAME" > /etc/hostname
# Prevent hostname resolution issues
echo "127.0.0.1 $BOX_NAME" >> /etc/hosts
# Use new hostname immediately (skip restart)
hostname $BOX_NAME
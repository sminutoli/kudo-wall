# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  config.vm.box = "precise32"

  config.vm.network :forwarded_port, guest: 3000, host: 3000 #kudo server
  config.vm.network :forwarded_port, guest: 9229, host: 9229 #nodejs Chrome Inspector
  config.vm.network :forwarded_port, guest: 28017, host: 28017 #MongoDB
  config.vm.network :forwarded_port, guest: 28018, host: 28018 #MongoDB Web

  config.vm.network :private_network, ip: "33.33.33.10"

  config.vm.synced_folder ".", "/vagrant"

  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"

  config.vm.provision :shell, path: 'scripts/instalations/bootstrap.sh', privileged: true
end
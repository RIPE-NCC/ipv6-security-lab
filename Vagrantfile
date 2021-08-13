# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.box_version = "20210603.0.0"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1", id: "web"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  config.vm.provision "shell", reset: true, inline: <<-SHELL
     gpasswd -a vagrant lxd
     add-apt-repository -y ppa:ansible/ansible
     export DEBIAN_FRONTEND=noninteractive
     apt-get -y install ansible-base python3-packaging
     ansible-galaxy collection install community.general -p /usr/share/ansible/collections
  SHELL
  config.vm.provision "ansible_local" do |ansible|
    ansible.install = false
    ansible.playbook = "ansible/site.yaml"
    ansible.inventory_path = "ansible/inventory.ini"
    ansible.verbose = false
    ansible.limit = "all"
  end
end

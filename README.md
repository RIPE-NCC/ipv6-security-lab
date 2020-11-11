Vagrant-based personal network lab - IPv6 Security
==================================================

This is a small self contained lab for playing with IPv6 security tools. It uses [VirtualBox](https://www.virtualbox.org/) to run a virtual
Linux server hosting a few [LXD](https://linuxcontainers.org/lxd/) containers
running CentOS 7. For a convenient access to
the consoles of the virtual routers, [ttyd](https://github.com/tsl0922/ttyd) is
used to provide web-based terminal access.

The lab is highly customizable using [Vagrant](https://www.vagrantup.com/) to
provide the virtual server and [Ansible](https://www.ansible.com/) to do the
configuration. It should work on Windows, macOS and Linux.

Installation
------------

  1. Install [VirtualBox](https://www.virtualbox.org/)
  2. Install [Vagrant](https://www.vagrantup.com/)
  3. Clone or [download](https://gitlab.ripe.net/lnd/ipv6-security-lab/-/archive/ipv6_security/ipv6-security-lab-ipv6_security.zip) and unpack ZIP of this repository somewhere
  4. Open a terminal window, enter the cloned repository (using `cd` command) directory and run `vagrant up`
  5. Wait a few minutes until vagrant finishes the preparation. Several hundred
megabytes will be downloaded during the process.
  6. Access the lab environment by pointing your web browser to [`http://localhost:8080/`](http://localhost:8080/)
  
Stopping, restarting and destroying the lab
-------------------------------------------

Then, you can turn off the VM by running `vagrant halt` in the same directory
you run `vagrant up` before. You can use the latter command to restart the lab
later.

You can destroy the lab environment by issuing `vagrant destroy`. A subsequent
call of `vagrant up` will bring up a completely fresh environment.

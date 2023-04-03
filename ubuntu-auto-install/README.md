Autoinstall files for Ubuntu
============================

The contents of this directory can be used to automate fresh installation
of the lab environment without the help of Vagrant or Virtualbox. It uses
[Automated Server
installation](https://ubuntu.com/server/docs/install/autoinstall) feature
of Ubuntu server together with [cloud-init](https://cloud-init.io/). It can
run anywhere where Ubuntu 22.04 is supported, including ARM architecture
computers like M1/M2 Apple Hardware. It has been tested using
[UTM](https://mac.getutm.app/) hypervisor on both arm64 and x86_64
architectures. Other hypervisors and/or architectures might or might not
work.

Prerequisites for building UTM-based Virtual Machine
----------------------------------------------------
 - A computer running macOS based on either Intel or Apple Silicon
 - At least 10 GB of free disk space
 - [UTM](https://mac.getutm.app/)
 - Ubuntu Server ISO file for particular architecture:
   [Intel](https://ubuntu.com/download/server) or
   [ARM](https://ubuntu.com/download/server/arm)

Preparing virtual machine from scratch
--------------------------------------

1. In UTM, press "Create a New Virtual Machine."
2. Select "Virtualize", then "Linux". Provide ISO image. Provision at least 2048
   GB RAM and 10 GB disk. The rest can stay on default.
3. Edit machine settings, remove sound card by right clicking it and edit QEMU
   options providing path to Autoinstall files. At the very bottom, in the field
   with prompt "New…", put this path:
   
   ```
   -smbios type=1,serial=ds=nocloud-net;s=https://raw.githubusercontent.com/RIPE-NCC/ipv6-security-lab/main/ubuntu-auto-install/
   ```
4. In case of Intel computer, adjust virtual machine setup like this:
   - Display: Emulated Display Card: `virtio-vga-gl`
   - Network: Emulated Network Card: `virtio-net-pci`
   - Hard disk: Interface: `VirtIO`

5. Run the VM. It should start booting from the ISO image and spit a lot of
   text.
6. You will be prompted "Continue with autoinstall? (yes/no)". Answer `yes`.
7. After several minutes, the installer will reboot the virtual machine. Do NOT
   boot the ISO image again, eject it or select "Boot from next volume."
8. During the first start, the installation of the lab environment takes place.
   Please wait at least minutes. You can log in using password "ubuntu" or
   just wait. Don't get bothered by "Login timed out after 60 seconds."
9. After installation is done, you will be logged in automatically. The last
   line before prompt should read: "status: done."

The lab environment should be fully accessible on a random IP address the
Virtual Machine got assigned. You can see the IP address by using command
`ip -br addr show enp0s1`. You can stop the VM gracefully by issuing `poweroff`.

Final touches
-------------

After the installation is done, you can prepare a VM image that would be
suitable for distribution. In this, we change network setup so it uses localhost
port 8080 and we remove display so the VM can run headless.

1. Shut down the image gracefully by issuing `poweroff` in the console or `sudo
   poweroff` in the admin console of the web interface.
2. In VM settings, change Network Mode to "Emulated VLAN". A new section called
   "Port Forwarding" appears in the menu.
3. In the "Port Forwarding" menu, add a new item and fill in: Protocol TCP,
   `10.0.2.15`, `80`, `127.0.0.1`, `8080`.
4. Remove display device
5. In VirtIO Drive, press Compress. This will significantly reduce the disk
   image.
6. Add descriptive name and put version as well as architecture into Notes.
7. Press Share button to share UTM image. Since the image is actually a folder,
   compress it with zip before uploading it somewhere.

Troubleshooting
---------------

 - From time to time, automated OS installation (the first step) fails for no
   obvious reason.  Resetting the VM and running it again usually helps.
 - The Ansible provisioning part can get stuck many ways since it downloads data
   from several sources around the Internet. You can see the logs only after it
   fails in `/var/log/cloud-init.log`. You can also try to run Ansible manually
   to see the exact cause of errors/delays :
   ```
   $ ansible-playbook -i ipv6-security-lab/ansible/inventory.ini ipv6-security-lab/ansible/site.yaml
   ```

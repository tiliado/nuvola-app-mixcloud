# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = true
  
    # Customize the amount of memory on the VM:
    vb.memory = "1024"
  end
  
   config.vm.provision "shell", inline: <<-SHELL
     apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 40554B8FA5FE6F6A
     echo "deb https://tiliado.eu/nuvolaplayer/repository/deb/ trusty stable" > /etc/apt/sources.list.d/tiliado-nuvolaplayer.list
     apt-add-repository multiverse 
     apt-get update
    apt-get install -y xorg gnome-core nuvolaplayer3 git librsvg2-bin flashplugin-installer
     rm -fr /tmp/mixcloud
     su - vagrant -c 'git clone https://github.com/s83/nuvola-app-mixcloud.git /tmp/mixcloud && cd /tmp/mixcloud && make uninstall && make install' 
   SHELL
end

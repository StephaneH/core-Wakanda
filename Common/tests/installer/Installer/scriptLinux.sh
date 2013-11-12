#!/bin/bash

#
##
## Specific function to call in a SystemWorker with simple args
## 
#

#
##
## How to ? : ./scriptLinux.sh showContents,argsX : $X,argsX+1 : $X+1 
##
#

example() {

echo "example $1 $2 $3";

}

# execute this following line : ./scriptLinux.sh example,a,b,c | Display : example a b c

#
##
## Functions for installer automatic Tests
##
#

showContents() {

  sudo dpkg --contents "$1"

}

displayRights() {

  ls -l /opt/ | tail -1 | awk '{k=0;for(i=0;i<=8;i++)k+=((substr($1,i+2,1)~/[rwx]/)*2^(8-i));if(k)printf("%0o ",k);print $1}'

}

displayArchitectureType() {

if [ "$(arch)" = "x86_64" ]
then 
  file /opt/wakanda/bin/wakanda | grep 64 | awk '{print $3}'
else
  file /opt/wakanda/bin/wakanda | grep 32 | awk '{print $3}'  
fi 

}

for arg in $@
do
	cmd=`echo $arg | sed 's/,/ /g'`

	$cmd

done

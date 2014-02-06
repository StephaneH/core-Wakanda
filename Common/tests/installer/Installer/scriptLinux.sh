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

  ls -ld "$1" | awk '{k=0;for(i=0;i<=8;i++)k+=((substr($1,i+2,1)~/[rwx]/)*2^(8-i));if(k)printf("%0o ",k);print $1}'

}

displayArchitectureType() {

if [ "$(arch)" = "x86_64" ]
then 
  file "$1" | grep 64 | awk '{print $3}'
else
  file "$1" | grep 32 | awk '{print $3}'  
fi 

}

licenceCheck() {

ls "$1" | tail -1	

}

enterpriseSpecific() {

FILEFOLDERNAME="$1"

if [ -d "$FILEFOLDERNAME" ]
then 
	echo "$FILEFOLDERNAME exist";
else
	if [ -f "$FILEFOLDERNAME" ]
		then
		echo "$FILEFOLDERNAME exist";
	else
		echo "$FILEFOLDERNAME doesn't exist";
	fi
fi

}

while [ -n "$1" ]
do 
	cmd=`echo "$1" | sed 's/,/ /g'`
    eval "$cmd"
	
	shift 
done
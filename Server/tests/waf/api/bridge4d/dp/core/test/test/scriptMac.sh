#!/bin/bash
nohup "$1" "$2" > /dev/null 2>&1 & echo $!
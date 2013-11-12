#!/bin/bash
echo "y" | hdiutil attach "$1" > /dev/null
hdiutil info
#!/bin/ash

## declare pins as input
fast-gpio set-input 0
fast-gpio set-input 1
fast-gpio set-input 2
fast-gpio set-input 3
fast-gpio set-input 4
fast-gpio set-input 5
fast-gpio set-input 6
fast-gpio set-input 7
fast-gpio set-input 8
fast-gpio set-input 9
fast-gpio set-input 10
fast-gpio set-input 11

while true
do

  if fast-gpio read 0 | grep ": 1"; then
    wget -q "http://178.128.84.48/write_file.php?lat=-32.92643&lng=151.756431"
  elif fast-gpio read 1 | grep ": 1"; then
    wget -q "http://178.128.84.48/write_file.php?lat=-32.92642&lng=151.756397"
  elif fast-gpio read 2 | grep ": 1"; then
    wget -q "http://178.128.84.48/write_file.php?lat=-32.926429&lng=151.756390333333"
  elif fast-gpio read 3 | grep ": 1"; then
    wget -q "http://178.128.84.48/write_file.php?lat=-32.926438&lng=151.756383666667"
#  elif fast-gpio read 4 | grep ": 1"; then
#    wget -q "http://178.128.84.48/write_file.php?lat=-32.926447&lng=151.756377"
#  elif fast-gpio read 5 | grep ": 1"; then
#    wget -q "http://178.128.84.48/write_file.php?lat=-32.926445&lng=151.756395"
#  elif fast-gpio read 6 | grep ": 1"; then
#    wget -q "http://178.128.84.48/write_file.php?lat=-32.926443&lng=151.756413"
  elif fast-gpio read 7 | grep ": 1"; then
    wget -q "http://178.128.84.48/write_file.php?lat=-32.926441&lng=151.756431"
  elif fast-gpio read 8 | grep ": 1"; then
    wget -q "http://178.128.84.48/write_file.php?lat=-32.926448&lng=151.756442333333"
  elif fast-gpio read 9 | grep ": 1"; then
    wget -q "http://178.128.84.48/write_file.php?lat=-32.926455&lng=151.756453666667"
#  elif fast-gpio read 10 | grep ": 1"; then
#    wget -q "http://178.128.84.48/write_file.php?lat=-32.926424&lng=151.75641"
  elif fast-gpio read 11 | grep ": 1"; then
    wget -q "http://178.128.84.48/write_file.php?lat=-32.926462&lng=151.756465"
  fi

  sleep 1
done

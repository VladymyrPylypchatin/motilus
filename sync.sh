#!/usr/bin/expect -f
puts "Publisihng on live server"

eval spawn rsync -a -avz -r -I --progress  --exclude "/bookingsystem/node_modules" --exclude "/bookingsystem/source" --exclude ".git" . motilus:public_html
expect "password:"
send "Motilhosting0!"
send "\n"
interact
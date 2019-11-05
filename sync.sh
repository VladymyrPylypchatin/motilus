#!/usr/bin/expect -f
puts "Publisihng on live server"

eval spawn rsync -a -avz --progress  --exclude "/bookingsystem/node_modules" --exclude "/bookingsystem/source" --exclude ".git" . motilus:vova
expect "password:"
send "Motilhosting0!"
send "\n"
interact
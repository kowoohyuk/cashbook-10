REPOSITORY=/home/ubuntu/cashbook-10/server
cd $REPOSITORY

pm2 start dist/index.js
pm2 save
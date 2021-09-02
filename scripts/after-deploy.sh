REPOSITORY=/home/ubuntu/cashbook-10/server
cd $REPOSITORY

pm2 start npm --name cashbook-10 -- run dev --watch
pm2 save
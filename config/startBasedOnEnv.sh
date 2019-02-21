if [ "$NODE_ENV" = "" ]
then
    echo "Env variable NODE_ENV should be set to one of [ debug , dev , prod ] "

elif [ "$NODE_ENV" = "debug" ]
then
    npm run debug

elif [ "$NODE_ENV" = "local" ] || [ "$NODE_ENV" = "dev" ] || [ "$NODE_ENV" = "development" ]
then
    npm run start:dev

elif [ "$NODE_ENV" = "prod" ] || [ "$NODE_ENV" = "production" ]
then
    npm run start:prod
fi
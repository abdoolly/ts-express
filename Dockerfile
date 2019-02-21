From microservice-base-image:latest

WORKDIR /service

# Create app directory
WORKDIR /service
COPY package.json .
COPY .npmrc .
RUN npm install
COPY src/ src/
COPY test/ test/

EXPOSE 80

CMD [ "npm", "start" ]

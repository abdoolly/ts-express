FROM node:slim
WORKDIR /app

RUN npm install

# CMD ["npm","run","start:prod"]
CMD ["npm","run","debug"]
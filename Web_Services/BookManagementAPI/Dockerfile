FROM node:10

#create app directory
WORKDIR /usr/src/app

#Install app dependencies
COPY package*.json ./

RUN npm install

#Bundle app source
COPY . .

# exposing port
EXPOSE 3000

#starting the server
CMD [ "node", "app.js"]
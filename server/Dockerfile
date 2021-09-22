#  Dockerfile for Node Express Backend

FROM node:14-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm i -g npm@latest
RUN npm install --silent
RUN npm install -g nodemon
# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]

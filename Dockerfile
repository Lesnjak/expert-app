FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

# Bundle app source
COPY package*.json ./

RUN yarn 

COPY . .

CMD [ "./docker-entrypoint.sh" ]

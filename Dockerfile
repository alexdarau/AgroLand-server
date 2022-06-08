FROM node:16-alpine

RUN node -v
RUN npm -v

WORKDIR /usr/src

COPY . /usr/src/

RUN npm install

CMD ["node", "dist/server.js"]
FROM node:21-alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]
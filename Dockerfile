FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY index.mjs index.mjs
COPY ./lib ./lib

CMD ["node", "index.mjs"]
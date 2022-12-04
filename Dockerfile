FROM node:19.2

WORKDIR /usr/discord-droid

COPY package*.json ./ \
    tsconfig*.json ./

RUN sed -i'.bak' 's/$/ contrib/' /etc/apt/sources.list \
    && apt-get update \
    && apt-get install ttf-mscorefonts-installer -y \
    && fc-cache -fv \
    && rm -rf /var/lib/apt/lists/* \
    && npm install \
    && npm install typescript

COPY . ./

RUN npm run build
WORKDIR /usr/discord-droid/dist
COPY ./src/config.json ./ \
    ./public ./

ENV PORT=4000
EXPOSE 4000

CMD node bot.js
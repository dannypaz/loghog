FROM node:12.16

LABEL maintainer="Sparkswap <dev@sparkswap.com>"

WORKDIR /home/app

RUN apt-get update && apt-get install -y vim bash

COPY ./ /home/app

RUN npm install --quiet

# Public ports (http)
EXPOSE 3000

ENTRYPOINT ["bash", "-c", "npm run dev"]

FROM node:9.4.0-slim

ARG env_node=dev
ARG tar=production
ARG cli=1.5.5

COPY ./edi-server/ /var/app/
COPY ./edi-ui/ /var/web/

RUN apt-get update -y && apt-get install -y python &&\
    chown -R node:node /var/web &&\
    chown -R node:node /var/app &&\
    rm -rf /var/app/node_modules &&\
    rm -rf /var/web/node_modules

USER node

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /var/web

RUN npm install && npm install -g @angular/cli@$cli &&\
    ng build --target=$tar --env=$env_node

WORKDIR /var/app
RUN npm install

EXPOSE 9595

CMD ["node", "index"]
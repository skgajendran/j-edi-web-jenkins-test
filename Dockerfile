FROM node:9.4.0-slim

ARG env_node=dev
ARG tar=production
ARG cli=1.5.5

COPY ./edi-server/ /var/app/
COPY ./edi-ui/ /var/web/

WORKDIR /var/web

RUN npm cache clean && npm install && npm install npm install -g @angular/cli@$cli &&\
    ng build --target=$tar --env=$env_node

WORKDIR /var/app
RUN npm install

CMD ["node", "index"]
# POC AMQP events

POC consumer events from api-backend (see https://openartcoded.github.io/doc/events/index.html ).

Currently only handles `InvoiceGenerated` event. It simply downloads the invoice and save it to `/data`.

## Prerequisite

- NodeJS 16.10
- Docker
- OpenArtcoded (latest version)

- If you have already tested the app before, better to delete it entirely:
    - `docker-compose down`
    - `docker system prune`
    - `rm -rf <path-to-app-docker>/data`
- Follow this tutorial: https://openartcoded.github.io/doc/installation/compiled.html
    - if you already followed it, only re-import the keycloak-realms
- clone this repo

## Run locally
- inside this repo, run `node index.mjs`
- Generate a new invoice from the app
- You should see in the logs:
    ```
    new invoice with number '052022-bJ' has been generated. Saving invoice...
    invoice '052022-bJ' saved at './data/052022-bJ_590cc2f6-1a16-42d8-867b-87538d7e6d65.pdf'

    ``` 

## Docker/Docker-compose
- inside this repo, run `docker build -t poc_amqp .`
- go to `<path-to-app-docker>` & create an empty file called `docker-compose.override.yml`
- add the following inside the file:
```
version: '3.5'
services:
  eventconsumer:
      image: poc_amqp
      networks:
          artcoded:
      volumes:
          - ./data/eventconsumer:/data
      environment:
          AMQP_USERNAME: root
          AMQP_PASSWORD: root
          AMQP_HOST: artemis
          AMQP_PORT: 61616
          AMQP_Q: "backend-event" # the name of the queue
          API_BACKEND_URL: "http://api-backend"
          API_CLIENT_ID: "service-account-download"
          API_CLIENT_SECRET: "duzp0kzwDHSS2nSO46P3GBGsNnQbx5L3"
          API_TOKEN_URL: "http://auth.somehost.org:8080/realms/Artcoded/protocol/openid-connect/token"
          FILE_DOWNLOAD_DIR: "/data"

``` 

- run `docker-compose up -d`
- Generate a new invoice from the app
- check the logs `docker-compose logs -f eventconsumer`
- You should see in the logs something like:
    ```
    new invoice with number '052022-bJ' has been generated. Saving invoice...
    invoice '052022-bJ' saved at './data/052022-bJ_590cc2f6-1a16-42d8-867b-87538d7e6d65.pdf'

    ``` 



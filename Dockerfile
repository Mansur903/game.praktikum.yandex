ARG NODE_VERSION=18

FROM node:$NODE_VERSION-buster as base

WORKDIR /app

FROM base as builder

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# RUN yarn bootstrap
RUN rm -rf /app/packages/client/dist/ && rm -rf /app/packages/client/ssr-dist/ && yarn build --scope=client
RUN rm -rf /app/packages/server/dist/ && yarn build --scope=server

FROM node:$NODE_VERSION-buster-slim as production
WORKDIR /app

COPY --from=builder /app/packages/client/dist/ /app/client
COPY --from=builder /app/packages/client/ssr-dist/ /app/ssr
COPY --from=builder /app/packages/server/dist/ /app/server
COPY --from=builder /app/packages/server/package.json /app/package.json
RUN yarn install --production=true

EXPOSE $VITE_SERVER_PORT
CMD [ "node", "/app/server/index.js" ]

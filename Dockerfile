################### FIRST STAGE - COMPILE and BUILD
FROM node:14-alpine AS build

ENV BUILD_DIR /build-dir

WORKDIR $BUILD_DIR

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . $BUILD_DIR
RUN npm run build

#################### SECOND STAGE - RUN
FROM node:14-alpine


ENV BUILD_DIR /build-dir
ENV APP_DIR /app

WORKDIR $APP_DIR

COPY --from=build $BUILD_DIR/dist/* $APP_DIR/src/
COPY --from=build $BUILD_DIR/package.json $APP_DIR/
COPY --from=build $BUILD_DIR/package-lock.json $APP_DIR/

RUN npm install --production --silent

CMD ["npm", "run", "start:prod"]
EXPOSE 3500
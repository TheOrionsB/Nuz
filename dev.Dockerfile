FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn
CMD ["yarn", "serve"]
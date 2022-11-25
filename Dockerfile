FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . ./
<<<<<<< HEAD
RUN yarn build
=======
RUN yarn build --mode production
>>>>>>> main


FROM nginx:latest as run
EXPOSE 80
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
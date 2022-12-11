FROM node:lts-alpine AS build

WORKDIR /Frontend

# install dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm install

# build react
COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /Frontend/build /usr/share/nginx/html

EXPOSE 80

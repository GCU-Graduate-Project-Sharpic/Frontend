FROM node:18-alpine AS build

WORKDIR /Frontend
COPY . .
RUN npm install
RUN npm run build

FROM golang:1.19-alpine

WORKDIR /
RUN apk add --no-cache git
RUN git clone -b main --single-branch --depth 1 https://github.com/GCU-Graduate-Project-Sharpic/Backend.git
WORKDIR /Backend
RUN go mod download

COPY --from=build /Frontend/build /Frontend

RUN go build -o /run-server

EXPOSE 8005

CMD [ "/run-server" ]

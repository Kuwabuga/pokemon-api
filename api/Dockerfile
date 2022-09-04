FROM golang:alpine as builder
RUN mkdir /build 
ADD . /build/
WORKDIR /build
RUN go build -o main .

FROM alpine

RUN mkdir /api
COPY --from=builder /build/main /api/

COPY ../.env /api/
WORKDIR /api

ARG db_user
ARG db_name
ARG db_password
ARG db_host

ENV DB_USER=${db_user}
ENV DB_NAME=${db_name}
ENV DB_PASSWORD=${db_password}
ENV DB_HOST=${db_host}

CMD ./main --db_user ${DB_USER} --db_password ${DB_PASSWORD} --db_host ${DB_HOST}
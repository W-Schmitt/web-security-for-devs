FROM golang:1-alpine

COPY . /app

WORKDIR /app

RUN go build .

EXPOSE 8080

CMD ["go","run","server.go"]
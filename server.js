const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')
require ('dotenv').config()

const router = require("./server/router")

const port = 4001
const app = express()


if (process.env.NODE_ENV !== "production") {
  const middleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const config = require('./webpack.config.js')
  const compiler = webpack(config)
  app.use(middleware(compiler, {}))
}

// our localhost port
app.use(express.static("./public"))
// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

//TODO serve middleware to io.server

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

app.use('/', router)


server.listen(port, () => console.log(`Listening on port ${port}`))
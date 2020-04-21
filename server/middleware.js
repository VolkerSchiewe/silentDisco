const express = require('express')
const app = express()
require('dotenv').config()
const middleware = require('webpack-dev-middleware')

const compression = require('compression')
const cors = require('cors')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')

//TODO import compiler
const webpack = require('webpack')
const config = require('../webpack.config')
const compiler = webpack(config)

app.use(middleware(compiler, {}))
    .use(cors())
    .use(cookieParser())
    .use(compression())

const cookieSessionMiddleware = cookieSession({
        name: "session",
        secret: process.env.SESS_SECRET,
        maxAge: 1000 * 60 * 60 * 24
    }
)

app.use(cookieSessionMiddleware)


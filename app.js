const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const session = require('express-session')
const { Mongoose } = require('mongoose')
const passport = require('passport')
const path = require('path')
const MongoStore = require('connect-mongo')(session)

dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

// cors configurations
let corsOptions = {
    origin: ['http://frontend.farmside.test:8080', 'http://localhost:8000'],
    optionsSuccessStatus: 200
}

// Connect to DB
connectDB()

const app = express()

// Static folder
app.use('/uploads', express.static(__dirname + '/public/'))
app.use(cors(corsOptions))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(morgan('dev'))


app.use(session({
    secret: 'farmside',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))
app.use('/messages', require('./routes/message'))
app.use('/bookings', require('./routes/booking'))
app.use('/about', require('./routes/about'))
app.use('/portfolio', require('./routes/portfolio'))
app.use('/subscription', require('./routes/subscription'))


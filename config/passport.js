const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Admin = require('../models/Admin')

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        Admin.findById(id, (err, user) => {
            done(err, user)
        })
    })
    
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        Admin.findOne({email: email}, (err, user) => {
            if (err) {
                return done(err)
            }

            if (!user) {
                return done(null, false, {message: 'User not found'})
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if(err) {
                    return done(err)
                }

                if (res == false) {
                    return done(null, false, {message: "Password is incorrect"})
                }

                return done(null, user)
            })
        })
    }))
    // User.register({name: 'Test Admin', username: 'test@admin.com', active: false}, '123456789')

}
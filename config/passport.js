const passport = require('passport')
const User = require('../models/user')
const LocalStragtegy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

module.exports = app => {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStragtegy({ usernameField: 'email', passReqToCallback: true },(req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error', '該Email尚未註冊。'))
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, req.flash('error', 'Email或密碼輸入錯誤！')) 
          }
          return done(null, user)
        })
      })
      .catch(error => done(error, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })
}
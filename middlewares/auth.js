module.exports = {
    // Ensure user is logged in
    ensureAuth: (req, res, next) => {
        if (!req.isAuthenticated()) {
          res.status(401).send('You are not authenticated')
        } else {
          return next()
        }
    }
}
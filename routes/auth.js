const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');

router.post('/auth/signup', (req, res, next) => {
    User.register(req.body, req.body.password)
        .then((user) => res.status(201).json({ user }))
        .catch((err) => res.status(500).json({ err }));
});

router.post('/auth/login', passport.authenticate('local'), (req, res, next) => {
    const { user } = req;
    res.status(200).json({ user });
});

router.get('/auth/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ msg: 'Logged out' });
});

router.get('/auth/profile', isAuth, (req, res, next) => {
    User.findById(req.user._id)
        .then((user) => res.status(200).json({ user }))
        .catch((err) => res.status(500).json({ err }));
});

router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }))

router.get("/auth/facebook/callback", (req, res, next) => {
    passport.authenticate("facebook", { scope: ["email"] }, (err, user, info) => {
        if (err) return res.status(500).json({ err, info })
        if (!user) return res.status(401).json({ err, info })
        req.login(user, error => {
            if (error) return res.status(401).json({ error })
            return res.redirect(process.env.FRONTENDPOINT + "/fragments")
        })
    })(req, res, next)
})

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))

router.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", { scope: ["email"] }, (err, user, info) => {
        if (err) return res.status(500).json({ err, info })
        if (!user) return res.status(401).json({ err, info })
        req.login(user, error => {
            if (error) return res.status(401).json({ error })
            return res.redirect(process.env.FRONTENDPOINT + "/fragments")
        })
    })(req, res, next)
})

function isAuth(req, res, next) {
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
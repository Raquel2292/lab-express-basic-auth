const { response } = require('express');
const express = require('express');
const router = express.Router();
const User = require ("../models/User.model");

const {isLoggesIn} = require("../middlewares/auth.middlewares.js")


router.get ("/", isLoggesIn, (req, res, next) => {

    User.findById(req.session.activeUser._id)
    .then((response) => {
        res.render("profile/profile.hbs", {
            userDetails: response 
        })
    })
    .catch((error) => {
        next(error)
    })

   
})
module.exports = router;
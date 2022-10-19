const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

router.get("/signup", (req, res, next) => {
    res.render("auth/signup.hbs")
})

router.post("/signup", async (req, res, next) => {
   const  { username, password} = req.body;
   if ( username === "" || password === "") {
    res.render("auth/signup.hbs", {
        errorMessage: "Rellene los campos"
    });
    return;
   }

   try{
   const salt = await bcrypt.genSalt(10);
   const hashpassword = await bcrypt.hash(password, salt);

   const newUser = {
    username: username, 
    password: hashpassword,
   }
   await User.create(newUser)
   res.redirect("/auth/login");
   }
   catch(error) {
    next(error)
   }
 
})

router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs")
})

router.post("/login", async (req, res, next) => {
    const {username, password} = req.body;

    if (username === "" || password === "") {
        res.render ("auth/login.hbs", {
            errorMessage: "Rellene los campos"
        })
        return;
    }

    try {
        const foundUser = await User.findOne ({ username: username})
        if (foundUser === null) {
            console.log("Que pasa")
            res.render ("auth/login.hbs", {
                errorMessage: "Credenciales incorrectas,"
                
            })
            return;
        }
        const isPassWordValid = await bcrypt.compare (password, foundUser.password)
        if (isPassWordValid === false) {
            console.log("mierda")
            res.render ("auth/login.hbs", {
                errorMessage: "Credenciales incorrectas"
            })
            return;
        }
        req.session.activeUser = foundUser;

        req.session.save(() => {

        })

        res.redirect("/")
    }catch (error) {
        next(error)
    }
})

router.get ("/logout", ( req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})


module.exports = router;
import express from 'express'
import { saveUser } from '../services/signupService.js';
import passport from 'passport';


const router =  express.Router()

router.get("/register", (req, res) => {
    res.render("form"); 
  });

router.post('/register', async (req, res) => {
    try {
        const { name , email, password, age } = req.body;
        const response = await saveUser(name,email,password,age);
            if (response.success) {
            return res.status(200).send({ message: response.message });
        } else {
            throw new Error(response.error);
        }
    } catch (error) {
        console.log('Error in API:', error);
        return res.status(400).send({ message: error.message || "An error occurred" });
    }
});


 



//passport login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message });
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({ success: true, message: "Logged in successfully", user });
        });
    })(req, res, next);
});


export default router;
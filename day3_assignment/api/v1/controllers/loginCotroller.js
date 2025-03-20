import express from 'express'
import passport from '../services/passportService.js'

const router = express.Router()
router.get('/google', passport.authenticate("google", {
    scope: ['email', 'profile']
}));

router.get('/google/callback', passport.authenticate('google', {
    session: false,
}), async (req, res) => {
    try {
        console.log("success", req.user);
        res.redirect(`http://localhost:3002?token=bjabvjab`)
    } catch (error) {
        console.log("catch in google callback", err);
    }
})



//github

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function (req, res) {
    res.redirect(`http://localhost:3002?token=bjabascacvjab`)// Successful authentication, redirect path.
});





export default router;
import express from 'express'
import auth from '../config/auth'


var router = express.Router()

router.post('/', function (req, res, next) {
    auth.login(req, res, next)
})

router.post('/logout', function(req, res) {
    req.logOut();
    res.status(200).send('Logout succesful')
    /*
    req.session.destroy((error) => {
        res.status(200).send('Logout succesful')
    })*/
    //req.session = null;
    //res.status(200).send('Logout successful')
    //res.redirect('localhost:8080/')
})

module.exports = router
//passport
import passport from 'passport'
import passportJWT from 'passport-jwt'
import jwt from 'jsonwebtoken'

import models from '../src/models'

var LocalStrategy = require('passport-local').Strategy;

const jwtStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

const secret = "LunchJWTsecret"

passport.use(new LocalStrategy( {usernameField: 'username', passwordField: 'username'},
  function(username, password, done) {
    models.user.findOne({ attributes: ['id','name'], 
        where : {name: username} }).then( function (user) {
      //if (err) { return done(err); }
      if (!user) { return done(null, false); }

      return done(null, user);
    });
  }
));

passport.use('jwt' , new jwtStrategy({
  jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}, function(jwtPayload, cb) {
  return models.user.findOne({attributes: ['id'], where: {
    id: jwtPayload.user.id
  }}).then(user=> {
    console.log('id = '+ JSON.stringify(jwtPayload))
    return cb(null, user)
  })
  .catch(err => {
    console.log('err = '+err)
    return cb(err);
  })
}))

passport.serializeUser(function(user, done) {
  console.log('serialize user = ' + user.id)
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  console.log('Deserialize user')
  models.user.findOne({attributes: ['id'], where: {id: id}}).then(function (user) {
      if(user)
      {
        done(err, user)
      }
  })
});

function login (req, res, next) {
    //console.log('body = '+ JSON.stringify((req.body)))
    passport.authenticate('local', {session: false}, function(err, user, info) {
        //console.log('in auth')
        if (err) { 
            return next(err); 
        }

        if (!user) {
            //return res.redirect('/login');
            console.log('user not found '+ JSON.stringify(info))
            res.status(404).send('user not found')
        }
        else
        {
            req.login(user, {session: false}, function(err) {
              //console.log('success '+req.user.name+ ' session = '+ JSON.stringify(req.session))
              if(err)
              {
                res.status(500).send(err)
              }

              const token = jwt.sign({user: user}, secret, {expiresIn: 60*5});
              return res.status(200).json({user: user, token: token})
            })
        }
    })(req,res,next)
    
    //next();
}

function isAtLogin(req,res,next)
{
  if(req.body.operationName == 'Users')
  {
      res.status(200).send('At login')
  }
  else
  {
    next()
  }
}

function isAuth(req,res,next)
{
    if(req.body.operationName == 'Users')//(req.user != null || req.body.operationName == 'Users')
    {
        console.log('auth header = '+ JSON.stringify(req.headers))
        next()
    }
    else
    {
      console.log('auth header = '+ JSON.stringify(req.headers))
      passport.authenticate('jwt', {session: false})(req,res,next)
      /*
      passport.authenticate('jwt', {session: false}, (err,user,info) => {
        if(err)
        {
          res.status(500).send('Error')
        }

        if(!user)
        {
          res.status(404).send('user not found ')
        }

        res.status(200).send('user found')
      })*/
    }
}

module.exports = {
    isAuth,
    isAtLogin,
    login,
    passport
}
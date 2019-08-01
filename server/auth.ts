import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import UserService from './modules/User/service';
const config = require('./config/env/config')();

export default function AuthConfig(){
    const userService = new UserService();
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: config.secret
    };
    
    passport.use(new Strategy(opts, (jwtPayload, done) => {
        userService.getById(jwtPayload.id).then(user => {
            if(user){
                return done(null, {
                    id: user.id,
                    email: user.email
                });
            }

            return done(null, false);
        })
        .catch(error => {
            done(error, null);
        })
    }));

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { tokenTypes } = require('../utils/tokens.util');
const UtilisateurService = require('../services/utilisateur.service');
const jwtConfig =require('./jwt.config');
const jwtOptions = {
  secretOrKey: jwtConfig.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const utilisateur = await UtilisateurService.findById(payload.sub);
    if (!utilisateur) {
      return done(null, false);
    }
    done(null, utilisateur);
  } catch (error) {
    done(error, false);
  }
};

const jwtVerifyRat = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const utilisateur = await RatService.findById(payload.sub);
    if (!utilisateur) {
      return done(null, false);
    }
    done(null, utilisateur);
  } catch (error) {
    done(error, false);
  }
};

const jwtVerifyRfi = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const utilisateur = await RfiService.findById(payload.sub);
    if (!utilisateur) {
      return done(null, false);
    }
    done(null, utilisateur);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const jwtStrategyRat = new JwtStrategy(jwtOptions, jwtVerifyRat);
const jwtStrategyRfi = new JwtStrategy(jwtOptions, jwtVerifyRfi);

const passportConfig = {
    jwtStrategy,
    jwtStrategyRat,
    jwtStrategyRfi
};
module.exports = passportConfig;
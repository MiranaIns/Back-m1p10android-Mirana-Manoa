const jwt = require('jsonwebtoken');
const moment = require('moment');
const jwtConfig = require('../config/jwt.config');
const { tokenTypes } = require('../utils/tokens.util');

const generateToken = (userId, expires, type, secret = jwtConfig.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(jwtConfig.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user._id, accessTokenExpires, tokenTypes.ACCESS);
    return {
        access_token: accessToken,
        refresh_token:"",
        expires_at: accessTokenExpires.toDate()
    };
};

const TokenService = {
    generateToken,
    generateAuthTokens
}
module.exports = TokenService;
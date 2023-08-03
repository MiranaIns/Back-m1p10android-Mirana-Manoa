module.exports = {
    accessExpirationMinutes: process.env.ACCESS_EXPIRATION_DURATION || 60,
    secret: process.env.JWT_SECRET || "12345"
}
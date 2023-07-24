module.exports = {
        port: process.env.DB_PORT || 3308,
        database: process.env.DB_NAME || 'workflow',
        password: process.env.DB_PASS || 'root',
        username: process.env.DB_USER || 'root',
        host: process.env.DB_HOST || '172.17.0.2',
        dialect: process.env.DIALECT,
        logging: process.env.LOGGING || true,
        pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
        }
}
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database.config');
const Logger = require('../utils/logger.util.js');
const logger = new Logger();
const Constant= require('../utils/constant.util');

class PrivateSingleton {
    constructor() {
        logger.log('Creating instance of database ...',Constant.LOG_INFO);
        const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            port: dbConfig.port,
            dialect: dbConfig.dialect,
            operatorsAliases: 0,
            pool: {
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                acquire: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle
            },
            define: {
                defaultScope: {
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                timestamps: false
            }
        });
        let db = null;
        db = sequelize;
        this.db = db;
        logger.log('Instance of database is created',Constant.LOG_INFO);
    }
}
class Database {
    constructor() {
        logger.log('Using constructor of Singleton Database',Constant.LOG_ERROR)
    }
    static getInstance() {
        logger.log('Get database instance','info');
        if (!Database.instance) {
            Database.instance = new PrivateSingleton();
        }
        return Database.instance.db;
    }
}
module.exports = Database;

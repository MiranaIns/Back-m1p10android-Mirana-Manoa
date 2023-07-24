const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const DailyRotate = require('winston-daily-rotate-file');
const Constant = require('./constant.util');
const { env } = process.env.ENVIRONMENT;
const logDir = 'log';

let infoLogger;
let errorLogger;
let warnLogger;
let allLogger;

class LoggerUtils {
    constructor() {
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        infoLogger = createLogger({
            // change level if in dev environment versus production
            level: env === 'RECETTE' ? 'info' : 'debug',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),


            ),
            transports: [
                new transports.Console({
                    levels: Constant.LOG_INFO,
                    format: format.combine(
                        format.colorize(),
                        format.printf(
                            info => `${info.timestamp} ${info.level}: ${info.message}`,
                        ),
                    ),
                }),

                new (DailyRotate)({
                    filename: `${logDir}/%DATE%-info-results.log`,
                    datePattern: 'YYYY-MM-DD',
                }),
            ],
            exitOnError: false,
        });

        errorLogger = createLogger({
            // change level if in dev environment versus production
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf(error => `${error.timestamp} ${error.level}: ${error.message}`),

            ),
            transports: [
                new transports.Console({
                    levels: Constant.LOG_ERROR,
                    format: format.combine(
                        format.colorize(),
                        format.printf(
                            error => `${error.timestamp} ${error.level}: ${error.message}`,
                        ),
                    ),
                }),

                new (DailyRotate)({
                    filename: `${logDir}/%DATE%-errors-results.log`,
                    datePattern: 'YYYY-MM-DD',
                }),
            ],
            exitOnError: false,
        });

        warnLogger = createLogger({
            // change level if in dev environment versus production
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf(warn => `${warn.timestamp} ${warn.level}: ${warn.message}`),

            ),
            transports: [
                new transports.Console({
                    levels: Constant.LOG_WARN,
                    format: format.combine(
                        format.colorize(),
                        format.printf(
                            warn => `${warn.timestamp} ${warn.level}: ${warn.message}`,
                        ),
                    ),
                }),

                new (DailyRotate)({
                    filename: `${logDir}/%DATE%-warnings-results.log`,
                    datePattern: 'YYYY-MM-DD',
                }),
            ],
            exitOnError: false,
        });

        allLogger = createLogger({
            // change level if in dev environment versus production
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf(silly => `${silly.timestamp} ${silly.level}: ${silly.message}`),

            ),
            transports: [
                new (DailyRotate)({
                    filename: `${logDir}/%DATE%-results.log`,
                    datePattern: 'YYYY-MM-DD',
                }),
            ],
            exitOnError: false,
        });
    }

    log(message, severity, data) {
        if (severity == null || infoLogger.levels[severity] == null) {
            this.severity = Constant.LOG_INFO;
        }
        if (severity === Constant.LOG_INFO) {
            infoLogger.log(severity, message, data);
            allLogger.log(severity, message, data);
        } else if (severity === Constant.LOG_ERROR) {
            errorLogger.log(severity, message);
            allLogger.log(severity, message, data);
        } else if (severity === Constant.LOG_WARN) {
            warnLogger.log(severity, message, data);
            allLogger.log(severity, message, data);
        }
    }
}

module.exports = LoggerUtils;
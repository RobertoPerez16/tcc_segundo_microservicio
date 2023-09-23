import { config } from 'dotenv';

config();
const appPort = process.env.APP_PORT;
const databaseConfig = {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_SERVER_NAME,
    database: process.env.DATABASE_SERVER_DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

export {
    appPort,
    databaseConfig
}

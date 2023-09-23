// Libraries //
import Express from 'express';
import morgan from 'morgan';
import sql from 'mssql';
import cors from 'cors';
// Modules //
import { appPort, databaseConfig } from './config/appConfig.js';
import clientRoutes from './routes/clientRoutes.js';

const app = Express();
app.use(morgan('dev'));
app.use(Express.json());
app.use( Express.urlencoded({ extended: false }));

const allowedOrigins = ['http://localhost:7000', 'http://localhost:5000', 'http://localhost:4200'];
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// DbConnection sql server //
try {
    await sql.connect(databaseConfig);
    console.log('connection successfully');
} catch (err) {
    console.log('Error: ', err);
}

// Routes //
clientRoutes(app);

app.listen(appPort, () => {
    console.log(`App running in http://localhost:${ appPort }`);
});



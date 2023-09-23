import sql from 'mssql';
import { databaseConfig } from '../config/appConfig.js';

const clientService = {};

clientService.listAllClients = async () => {
    try {
        const pool = await sql.connect(databaseConfig);
        const clients = await pool.request().execute('List_client');
        return clients.recordset;
    } catch (e) {
        console.log('Error: ', e);
        return new Error;
    }
}

clientService.searchClient = async (idNumber) => {
    try {
        const pool = await sql.connect(databaseConfig);
        const client = await pool.request()
            .input('nro_identificacion', idNumber)
            .execute('Show_client');
        return client.recordset;
    } catch (e) {
        console.log('Error: ', e);
        return new Error;
    }
}

export default clientService;

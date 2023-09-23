import { customResponse, isEmpty } from '../commons/response.js';
import { Router } from 'express';
import ClientService from '../services/clientService.js';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const clients = await ClientService.listAllClients();
        return customResponse(res, 200, clients, 'All clients');
    } catch (e) {
        console.log('Error: ', e);
        return customResponse(res, 500, null, 'Internal server error');
    }
});

router.get('/search', async (req, res) => {
   try {
       const { identificationNumber } = req.query;
       console.log('identificacionNumber: ', identificationNumber)
       if (isEmpty(identificationNumber)) return customResponse(res, 400, null, 'missing field or fields');
       const client = await ClientService.searchClient(identificationNumber);
       if (!client) {
           return customResponse(res, 400, null, 'not found');
       }
       return customResponse(res, 200, client, 'client');

   } catch (e) {
       console.log('Error: ', e);
       return customResponse(res, 500, null, 'Internal server error');
   }
});


export default router;

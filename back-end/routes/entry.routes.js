import express from 'express';
import { createEntry } from '../controllers/entry.controller.js';

const entryRoutes = express.Router();

entryRoutes.post('/create', createEntry);


export default entryRoutes;
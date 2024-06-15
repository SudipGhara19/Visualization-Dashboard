import express from 'express';
import { createEntry, createMultipleEntry } from '../controllers/entry.controller.js';

const entryRoutes = express.Router();

entryRoutes.post('/create-entry', createEntry);
entryRoutes.post('/create-entries', createMultipleEntry);

export default entryRoutes;
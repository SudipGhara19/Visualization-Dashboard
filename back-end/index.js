import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import entryRoutes from './routes/entry.routes.js';

dotenv.config();
const port = 5600;
const app = express();

app.use(express.json());

//connecting to mongoDb
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB::::::::::')
})
.catch((err) => {
    console.log(`ERROR in connecting MongoDB::::::${err}`);
})
//connecting to the server
app.listen(port, () => {
    console.log(`server is up and Running on PORT: ${port}`);
});

//--------------------------ROUTES--------------------------
app.use('/api/entries', entryRoutes);


//--------------------------ERROR Handler-------------------
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.json({
        success: false,
        statusCode,
        message
    })
}); 
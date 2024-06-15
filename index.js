import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const port = 5600;
const app = express();

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

app.get('/', (req, res) => {
    res.send('Hello World!')
});
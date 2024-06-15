import express from 'express';

const port = 5600;
const app = express();

app.listen(port, () => {
    console.log(`server is up and Running on PORT: ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});
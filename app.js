const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/match', (req, res) => {
    const requestBody = (req.body);
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
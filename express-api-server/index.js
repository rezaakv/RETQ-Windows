const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello there');

});

app.get('/health', (req, res) => {
    res.send('Healthy');
});


app.listen(9900, () => console.log("Now listening on Port 9900..."));
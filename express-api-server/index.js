const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello there');

});

app.get('/health', (req, res) => {
    res.send('Healthy');
});

app.post('/api/volume', (req, res) => {
    // const schema = Joi.object({
    //     volume: Joi.string().alphanum().min(1).max(3).required()
    // });
    // schema.validate(req.body);
    // console.log(req.headers);
    if(!req.body.volume) {
        res.status(400).send('Include the volume in body');
        return;
    }
    // API Check
    const fs = require('fs');
    const yaml = require('js-yaml');
    
    let data;
    try {
      let fileContents = fs.readFileSync('../creds.yml', 'utf8');
      data = yaml.load(fileContents);
    } catch (e) {
      console.log(e);
    }

    if(req.header('apikey') != data.key) {
        res.status(400).send('Bad API key');
        return;
    }

    let vol = req.body.volume;

    const publisher = require('./publisher');
    publisher.mqPublish(vol); // val is "Hello" 

    res.send(`Volume Set to ${vol}`);
});

const port = process.env.PORT || 9900;
app.listen(port, () => console.log(`Now listening on Port ${port}...`));
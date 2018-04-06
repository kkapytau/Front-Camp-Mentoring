const express = require('express');
const path = require('path');
const jsonList = require('./articleList.json');
const cors = require('cors');

const PORT = 4000;

const app = express();

app.use(cors());

// Serve built files with static files middleware
app.use('/', express.static(path.join(__dirname, './')));

app.get('/json',function(req,res){
    res.json(jsonList);
});

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
});
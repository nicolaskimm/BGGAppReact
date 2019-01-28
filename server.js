const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(cors());
app.use(express.static('build'));

app.get('/', function(req, res) {
    res.sendFile('/index.html');
});

app.listen(port, function(){
	console.log(`listening on port 3000`);
});
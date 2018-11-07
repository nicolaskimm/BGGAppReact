var express = require('express');
var app = express();
var port = 3000;
var path = require('path');
var cors = require('cors');

app.use(cors());

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port, function(){
	console.log('listening on *:3000');
});
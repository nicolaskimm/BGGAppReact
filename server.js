const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.static('./build'));

app.get('*', function(req, res){
    res.sendfile('../public/index.html');
})

app.listen(port, function(){
	console.log(`listening on port 3000`);
});
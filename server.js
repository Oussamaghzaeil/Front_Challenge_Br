//Initial express server
const express = require('express');
const path = require('path');

const app = express();

//serve only the static files form the dist directory
app.use(express.static('./dist/Front/src/app/login'));

app.get('/"',(req, res) =>
    res.sendFile('login.component.html',{root: 'dist/Front/src/app/login'}),
);

// start the app by listening on the default heroku port
app.listen(process.env.PORT || 8080);
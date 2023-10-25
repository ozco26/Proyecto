const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express(JSON));

app.use(express.static(path.join(__dirname,'css'))); 
app.use('/', require('./router'));



app.listen (5000, ()=>{
    console.log('Server Corriendo en http://localhost:5000');
});

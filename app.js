const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use('/',require('./router'));

/*app.get('/', (req, res)=>{
    res.send('Hola');
})*/

app.use(express.urlencoded({extended:false}));
app.use(express(JSON));


app.listen (5000, ()=>{
    console.log("server corriendo en http://localhost:5000")
});
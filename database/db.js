const mysql = require('mysql');

const conexion =  mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database: 'Proyecto'
})
conexion.connect((error)=>{
    if(error){
        console.error('El error de donexión es: '+error);
        return
    }
    console.log('Conectado a BD MySQL')
})

module.exports = conexion;
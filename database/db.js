const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyectoimplementacionv2'
})

conexion.connect((err)=>{
    if(err){
        console.error('El error de conexion es: '+err)
        return
    }
    console.log('Conectado a la BD MySQL');
})

module.exports=conexion;
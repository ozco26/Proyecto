const conexion = require('../database/db');

exports.save = (req,res)=>{
    const  cedula= req.body.cedula;
    const nombre = req.body.nombre;    
    const apellido = req.body.apellido;
    const email = req.body.email;
    const fechaNacimiento = req.body.fechaNacimiento;
    const password = req.body.password;
    const idrol = 1;
    console.log(nombre+" - "+cedula+" - "+apellido+" - "+fechaNacimiento+" - "+email+" - "+password);
}

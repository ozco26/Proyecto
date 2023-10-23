const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

var config = {
    server: "Derek_PC",
    authentication: {
      type: "default",
      options: {
        userName: "serverProyecto",
        password: "ejemplo"
      }
    },
    options: {
      port: 1433,
      database: "Proyecto",
      trustServerCertificate: true
    }
}

const connection = new Connection(config);

connection.connect();

connection.on('connect', (err)=>{
    if(err){
        console.log("error al conectarse a la base de datos");
        throw err;
    }else{
        console.log("Se conecto a la base de datos");
        executeStatement();
    }
    
});

function executeStatement() {
    const request = new Request("SELECT * FROM usuario", (err, rowCount) => {
        if (err) {
            console.error("Error al ejecutar la consulta:", err);
        } else {
            console.log(`Filas afectadas: ${rowCount}`);
        }

        // Cerrar la conexión después de ejecutar la consulta
        connection.close();
    });

    // Escuchar los resultados de la consulta
    request.on("row", (columns) => {
        columns.forEach((column) => {
            console.log(`${column.metadata.colName}: ${column.value}`);
        });
    });

    // Ejecutar la consulta
    connection.execSql(request);
}

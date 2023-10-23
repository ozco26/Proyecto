const { Connection, Request } = require('tedious');

const config = {
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

connection.on('connect', (err) => {
    if (err) {
        console.error("error al conectarse a la base de datos", err);
    } else {
        console.log("Se conectó a la base de datos");
        consultarUsuarios((err, usuarios) => {
          if (err) {
              console.error("Error en la consulta:", err);
          } else {
              console.log("Usuarios recibidos en el callback:");
              console.log(usuarios);
          }
        });
    }
});

function consultarUsuarios(callback) {
    const request = new Request("SELECT * FROM usuario", (err, rowCount) => {
        if (err) {
            console.error("Error al consultar usuarios:", err);
            callback(err, null);
        } else {
            const usuarios = [];
            request.on("row", (columns) => {
                const usuario = {};
                columns.forEach((column) => {
                    usuario[column.metadata.colName] = column.value;
                });
                usuarios.push(usuario);
            });
            request.on("doneInProc", () => {
                console.log("Usuarios consultados exitosamente:");
                console.log(usuarios); // Imprime los usuarios en la consola
                callback(null, usuarios);
            });

            // Ejecutar la consulta
            connection.execSql(request);
        }
    });
}

module.exports = {
    consultarUsuarios
};

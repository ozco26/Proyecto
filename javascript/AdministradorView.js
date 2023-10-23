document.addEventListener("DOMContentLoaded", function (){

    function popup(){
        alert("JavaScript");
    }

    const tablaactual = document.getElementById("generar__tabla");

    const generar = (tipo) => {
        let tablaHTML = `<tabla><thead><tr>`;
        if (tipo==="Cliente") {
            tablaHTML += `<th>Cliente</th><th>Email</th>`;
        }
        if (tipo==="Chofer") {
            tablaHTML += `<th>Chofer</th><th>Email</th>`;
        }
        if (tipo==="Ruta") {
            tablaHTML += `<th>Ruta</th><th>Email</th>`;
        }
        tablaHTML += `</tr></thead><tbody></tbody></table>`;
        tablaactual.innerHTML = tablaHTML;
    };

    document.getElementById("btn__cliente").addEventListener("click", () => generar("Cliente"));
    document.getElementById("btn__chofer").addEventListener("click", () => generar("Chofer"));
    document.getElementById("btn__ruta").addEventListener("click", () => generar("Ruta"));

});
document.addEventListener("DOMContentLoaded", function () {
    cargarColegios();
});

function cargarColegios() {
    fetch("http://localhost:3000/api/colegios")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("colegios-list");
            tbody.innerHTML = "";
            data.forEach(colegio => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${colegio.id}</td>
                    <td>${colegio.nombre}</td>
                    <td>${colegio.municipio.nombre}</td>
                    <td>
                        <button onclick="eliminarColegio(${colegio.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al cargar colegios:", error));
}

function eliminarColegio(id) {
    fetch(`http://localhost:3000/api/colegios/${id}`, { method: "DELETE" })
        .then(response => {
            if (response.ok) {
                cargarColegios();
            } else {
                console.error("Error al eliminar el colegio");
            }
        })
        .catch(error => console.error("Error al eliminar colegio:", error));
}

document.getElementById("agregar-colegio").addEventListener("click", function () {
    const nombre = prompt("Ingrese el nombre del colegio:");
    const municipioId = prompt("Ingrese el ID del municipio:");

    if (nombre && municipioId) {
        fetch("http://localhost:3000/api/colegios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, municipioId })
        })
        .then(response => {
            if (response.ok) {
                cargarColegios();
            } else {
                console.error("Error al agregar colegio");
            }
        })
        .catch(error => console.error("Error al agregar colegio:", error));
    }
});

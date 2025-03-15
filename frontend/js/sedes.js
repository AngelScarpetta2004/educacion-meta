document.addEventListener("DOMContentLoaded", function () {
    cargarSedes();
});

function cargarSedes() {
    fetch("http://localhost:3000/api/sedes")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("sedes-list");
            tbody.innerHTML = "";
            data.forEach(sede => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${sede.id}</td>
                    <td>${sede.nombre}</td>
                    <td>${sede.colegio.nombre}</td>
                    <td>
                        <button onclick="eliminarSede(${sede.id})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al cargar sedes:", error));
}

function eliminarSede(id) {
    fetch(`http://localhost:3000/api/sedes/${id}`, { method: "DELETE" })
        .then(response => {
            if (response.ok) {
                cargarSedes();
            } else {
                console.error("Error al eliminar la sede");
            }
        })
        .catch(error => console.error("Error al eliminar sede:", error));
}

document.getElementById("agregar-sede").addEventListener("click", function () {
    const nombre = prompt("Ingrese el nombre de la sede:");
    const colegioId = prompt("Ingrese el ID del colegio:");

    if (nombre && colegioId) {
        fetch("http://localhost:3000/api/sedes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, colegioId })
        })
        .then(response => {
            if (response.ok) {
                cargarSedes();
            } else {
                console.error("Error al agregar sede");
            }
        })
        .catch(error => console.error("Error al agregar sede:", error));
    }
});

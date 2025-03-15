document.addEventListener("DOMContentLoaded", async () => {
    const municipiosList = document.getElementById("municipios-list");
    
    // Función para obtener municipios desde la API
    async function cargarMunicipios() {
        try {
            const response = await fetch("http://localhost:3000/api/municipios");
            const municipios = await response.json();
            
            municipiosList.innerHTML = "";
            municipios.forEach(municipio => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${municipio.id}</td>
                    <td>${municipio.nombre}</td>
                    <td>
                        <button onclick="editarMunicipio(${municipio.id})">Editar</button>
                        <button onclick="eliminarMunicipio(${municipio.id})">Eliminar</button>
                    </td>
                `;
                municipiosList.appendChild(row);
            });
        } catch (error) {
            console.error("Error al cargar municipios:", error);
        }
    }
    
    // Función para agregar un municipio
    document.getElementById("agregar-municipio").addEventListener("click", async () => {
        const nombre = prompt("Ingrese el nombre del municipio:");
        if (nombre) {
            try {
                await fetch("http://localhost:3000/api/municipios", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre })
                });
                cargarMunicipios();
            } catch (error) {
                console.error("Error al agregar municipio:", error);
            }
        }
    });
    
    // Función para eliminar un municipio
    window.eliminarMunicipio = async (id) => {
        if (confirm("¿Seguro que deseas eliminar este municipio?")) {
            try {
                await fetch(`http://localhost:3000/api/municipios/${id}`, {
                    method: "DELETE"
                });
                cargarMunicipios();
            } catch (error) {
                console.error("Error al eliminar municipio:", error);
            }
        }
    };
    
    cargarMunicipios();
});

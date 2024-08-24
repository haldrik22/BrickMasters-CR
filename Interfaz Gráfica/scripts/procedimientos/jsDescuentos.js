document.addEventListener('DOMContentLoaded', function () {
    fetchDescuentos();
    populateClientDropdown();
    populateTipoDescuentoDropdown();
});

let isEdit = false;
let currentDescuentoId = null;

// Function to fetch descuentos
async function fetchDescuentos() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/descuentos');
        const descuentos = await response.json();
        const table = document.getElementById('descuentos-table');
        
        if (descuentos.length) {
            table.innerHTML = `<thead>
                <tr>
                    <th>ID</th>
                    <th>Cliente ID</th>
                    <th>Tipo Descuento ID</th>
                    <th>Acciones</th>
                </tr>
            </thead>`;
            const tbody = document.createElement('tbody');
            descuentos.forEach(descuento => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${descuento.FIDE_DESCUENTOS_V_ID_DESCUENTO_PK}</td>
                    <td>${descuento.FIDE_DESCUENTOS_V_ID_CLIENTE_FK}</td>
                    <td>${descuento.FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editDescuento(${descuento.FIDE_DESCUENTOS_V_ID_DESCUENTO_PK})">Editar</button>
                        <button class="btn btn-danger" onclick="deleteDescuento(${descuento.FIDE_DESCUENTOS_V_ID_DESCUENTO_PK})">Eliminar</button>
                    </td>`;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
        } else {
            table.innerHTML = '<p>No hay descuentos disponibles.</p>';
        }
    } catch (error) {
        console.error('Error fetching descuentos:', error);
    }
}

// Function to populate the client dropdown
async function populateClientDropdown() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes'); // Update this endpoint according to your API
        const clientes = await response.json();
        const dropdown = document.getElementById('descuento_cliente_fk');

        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.FIDE_CLIENTES_V_Id_cliente_PK;
            option.textContent = `${cliente.FIDE_CLIENTES_V_Id_cliente_PK} - ${cliente.V_Nom_cliente} ${cliente.V_Ape_cliente} - ${cliente.V_Correo_cliente} - ${cliente.V_Tel_cliente}`;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating client dropdown:', error);
    }
}

// Function to populate the tipo descuento dropdown
async function populateTipoDescuentoDropdown() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/tipo_descuento'); 
        const tipos = await response.json();
        const dropdown = document.getElementById('descuento_tipo_fk');

        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK;
            option.textContent = `${tipo.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK} - ${tipo.V_PORCENTAJE_DESCUENTO}%`;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating tipo descuento dropdown:', error);
    }
}

// Function to handle creating or editing a descuento
async function submitDescuentoForm() {
    const FIDE_DESCUENTOS_V_ID_CLIENTE_FK = parseInt(document.getElementById('descuento_cliente_fk').value);
    const FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK = parseInt(document.getElementById('descuento_tipo_fk').value);
    
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `http://127.0.0.1:5000/api/descuentos/${currentDescuentoId}` : 'http://127.0.0.1:5000/api/descuentos';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FIDE_DESCUENTOS_V_ID_CLIENTE_FK: FIDE_DESCUENTOS_V_ID_CLIENTE_FK,
                FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK: FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK
            })
        });

        if (response.ok) {
            alert('Descuento guardado exitosamente');
            fetchDescuentos();
            $('#createEditDescuentoModal').modal('hide');
        } else {
            alert('Error al guardar el descuento');
        }
    } catch (error) {
        console.error('Error saving descuento:', error);
    }
}

// Function to edit a descuento
function editDescuento(id) {
    fetch(`http://127.0.0.1:5000/api/descuentos/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('descuento_cliente_fk').value = data[0].FIDE_DESCUENTOS_V_ID_CLIENTE_FK;
            document.getElementById('descuento_tipo_fk').value = data[0].FIDE_DESCUENTOS_V_ID_TIPO_DESCUENTO_FK;
            currentDescuentoId = id;
            isEdit = true;
            $('#createEditDescuentoModal').modal('show');
        });
}

// Function to delete a descuento
function deleteDescuento(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este descuento?')) {
        fetch(`http://127.0.0.1:5000/api/descuentos/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Descuento eliminado exitosamente');
                    fetchDescuentos();
                } else {
                    alert('Error al eliminar el descuento');
                }
            })
            .catch(error => console.error('Error deleting descuento:', error));
    }
}

function openCreateModalDescuento() {
    isEdit = false;
    document.getElementById('descuentoForm').reset();
    $('#createEditDescuentoModal').modal('show');
}

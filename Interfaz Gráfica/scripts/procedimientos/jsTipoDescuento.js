document.addEventListener('DOMContentLoaded', function () {
    fetchTipoDescuentos();
    populateClientDropdown();
});

// Function to fetch Tipo Descuentos
async function fetchTipoDescuentos() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/tipo_descuento');
        const tipoDescuentos = await response.json();
        const table = document.getElementById('tipo-descuentos-table');
        
        if (tipoDescuentos.length) {
            table.innerHTML = `<thead>
                <tr>
                    <th>ID Tipo Descuento</th>
                    <th>ID Cliente</th>
                    <th>Porcentaje Descuento</th>
                    <th>Acciones</th>
                </tr>
            </thead>`;
            const tbody = document.createElement('tbody');
            tipoDescuentos.forEach(tipoDescuento => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${tipoDescuento.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK}</td>
                    <td>${tipoDescuento.FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK}</td>
                    <td>${tipoDescuento.V_PORCENTAJE_DESCUENTO}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editTipoDescuento(${tipoDescuento.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK})">Editar</button>
                        <button class="btn btn-danger" onclick="deleteTipoDescuento(${tipoDescuento.FIDE_TIPO_DESCUENTO_V_ID_TIPO_DESCUENTO_PK})">Eliminar</button>
                    </td>`;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
        } else {
            table.innerHTML = '<p>No hay tipos de descuento disponibles.</p>';
        }
    } catch (error) {
        console.error('Error fetching tipo descuentos:', error);
    }
}

// Function to populate client dropdown
async function populateClientDropdown() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes'); 
        const clients = await response.json();
        const dropdown = document.getElementById('tipo_descuento_cliente_fk');
        dropdown.innerHTML = '<option value="">Seleccione un Cliente</option>';

        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.FIDE_CLIENTES_V_Id_cliente_PK;
            option.text = `${client.FIDE_CLIENTES_V_Id_cliente_PK} - ${client.V_Nom_cliente} ${client.V_Ape_cliente} (${client.V_Correo_cliente}, ${client.V_Tel_cliente})`;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating client dropdown:', error);
    }
}

// Function to handle creating or editing a Tipo Descuento
async function submitTipoDescuentoForm() {
    const FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK = parseInt(document.getElementById('tipo_descuento_cliente_fk').value);  
    const V_PORCENTAJE_DESCUENTO = parseFloat(document.getElementById('tipo_descuento_porcentaje').value); 

    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `http://127.0.0.1:5000/api/tipo_descuento/${currentTipoDescuentoId}` : `http://127.0.0.1:5000/api/tipo_descuento`;
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK: FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK,
                V_PORCENTAJE_DESCUENTO: V_PORCENTAJE_DESCUENTO
            })
        });

        if (response.ok) {
            alert('Tipo Descuento guardado exitosamente');
            fetchTipoDescuentos();
            $('#createEditTipoDescuentoModal').modal('hide');
        } else {
            const errorData = await response.json();
            alert(`Error al guardar el tipo de descuento: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error saving tipo descuento:', error);
    }
}

// Function to edit a Tipo Descuento
function editTipoDescuento(id) {
    fetch(`http://127.0.0.1:5000/api/tipo_descuento/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('tipo_descuento_cliente_fk').value = data[0].FIDE_TIPO_DESCUENTO_V_ID_CLIENTE_FK;
            document.getElementById('tipo_descuento_porcentaje').value = data[0].V_PORCENTAJE_DESCUENTO;
            currentTipoDescuentoId = id;
            isEdit = true;
            $('#createEditTipoDescuentoModal').modal('show');
        });
}

// Function to delete a Tipo Descuento
function deleteTipoDescuento(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este tipo de descuento?')) {
        fetch(`http://127.0.0.1:5000/api/tipo_descuento/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Tipo Descuento eliminado exitosamente');
                    fetchTipoDescuentos();
                } else {
                    alert('Error al eliminar el tipo de descuento');
                }
            })
            .catch(error => console.error('Error deleting tipo descuento:', error));
    }
}

function openCreateModalTipoDescuento() {
    isEdit = false;
    document.getElementById('tipo_descuento_form').reset();
    $('#createEditTipoDescuentoModal').modal('show');
}

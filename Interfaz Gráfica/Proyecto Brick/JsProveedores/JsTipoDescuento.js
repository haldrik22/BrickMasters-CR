// Fetch discount types
async function fetchDiscountTypes() {
    try {
        const response = await fetch('http://localhost:5000/api/discount-types');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('discount-types-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Tipo Descuento</th>
                            <th>ID Cliente</th>
                            <th>ID Estado</th>
                            <th>Porcentaje Descuento</th>
                            <th>Creado Por</th>
                            <th>Modificado Por</th>
                            <th>Fecha de Creación</th>
                            <th>Fecha de Modificación</th>
                            <th>Acción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;
            const tbody = table.querySelector('tbody');
            data.forEach(row => {
                tbody.innerHTML += `
                    <tr>
                        <td>${row.FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK}</td>
                        <td>${row.FIDE_TIPO_DESCUENTO_V_Id_cliente_FK}</td>
                        <td>${row.FIDE_TIPO_DESCUENTO_V_Id_estado_FK}</td>
                        <td>${row.V_Porcentaje_descuento}</td>
                        <td>${row.V_Creado_por}</td>
                        <td>${row.V_Modificado_por}</td>
                        <td>${row.V_Fecha_de_creacion}</td>
                        <td>${row.V_Fecha_de_modificacion}</td>
                        <td>${row.V_Accion}</td>
                        <td>${row.V_Estado}</td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        console.error('Error fetching discount types:', error);
    }
}

// Create a new discount type
async function createDiscountType() {
    const id_tipo_descuento = document.getElementById('create_id_tipo_descuento')?.value;
    const id_cliente = document.getElementById('create_id_cliente')?.value;
    const id_estado = document.getElementById('create_id_estado')?.value;
    const porcentaje_descuento = document.getElementById('create_porcentaje_descuento')?.value;
    const creado_por = document.getElementById('create_creado_por')?.value;
    const fecha_creacion = document.getElementById('create_fecha_creacion')?.value;

    if (!id_tipo_descuento ||!id_cliente ||!id_estado ||!porcentaje_descuento ||!creado_por ||!fecha_creacion) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/api/discount-types', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id_tipo_descuento, 
                id_cliente, 
                id_estado, 
                porcentaje_descuento, 
                creado_por, 
                fecha_creacion 
            })
        });

        if (response.ok) {
            alert('Tipo de descuento creado exitosamente');
            fetchDiscountTypes();
        } else {
            const errorData = await response.json();
            alert(`Error creating discount type: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating discount type:', error);
        alert('Error creating discount type.');
    }
}

// Read a discount type
async function readDiscountType() {
    const id_tipo_descuento = document.getElementById('read_id_tipo_descuento').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/discount-types/${id_tipo_descuento}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        if (data.length > 0) {
            const tableContainer = document.getElementById('read-table');
            tableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            // Define the columns
            const columns = [
                'ID Tipo Descuento',
                'ID Cliente',
                'ID Estado',
                'Porcentaje Descuento',
                'Creado Por',
                'Modificado Por',
                'Fecha de Creación',
                'Fecha de Modificación',
                'Acción',
                'Estado'
            ];

            const headers = columns.map(column => {
                const th = document.createElement('th');
                th.textContent = column;
                return th;
            });

            const headerRow = document.createElement('tr');
            headers.forEach(th => headerRow.appendChild(th));
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Populate the table rows
            data.forEach(item => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = item.FIDE_TIPO_DESCUENTO_V_Id_tipo_descuento_PK || '';
                row.appendChild(idCell);

                const clienteCell = document.createElement('td');
                clienteCell.textContent = item.FIDE_TIPO_DESCUENTO_V_Id_cliente_FK || '';
                row.appendChild(clienteCell);

                const estadoCell = document.createElement('td');
                estadoCell.textContent = item.FIDE_TIPO_DESCUENTO_V_Id_estado_FK || '';
                row.appendChild(estadoCell);

                const porcentajeCell = document.createElement('td');
                porcentajeCell.textContent = item.V_Porcentaje_descuento || '';
                row.appendChild(porcentajeCell);

                const createdByCell = document.createElement('td');
                createdByCell.textContent = item.V_Creado_por || '';
                row.appendChild(createdByCell);

                const modifiedByCell = document.createElement('td');
                modifiedByCell.textContent = item.V_Modificado_por || '';
                row.appendChild(modifiedByCell);

                const creationDateCell = document.createElement('td');
                creationDateCell.textContent = item.V_Fecha_de_creacion || '';
                row.appendChild(creationDateCell);

                const modificationDateCell = document.createElement('td');
                modificationDateCell.textContent = item.V_Fecha_de_modificacion || '';
                row.appendChild(modificationDateCell);

                const actionCell = document.createElement('td');
                actionCell.textContent = item.V_Accion || '';
                row.appendChild(actionCell);

                const statusCell = document.createElement('td');
                statusCell.textContent = item.V_Estado || '';
                row.appendChild(statusCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            tableContainer.appendChild(table);
        } else {
            document.getElementById('read-table').innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('read-table').innerHTML = `<p>Ocurrió un error al leer el tipo de descuento: ${error.message}</p>`;
    }
}

// Update a discount type
async function updateDiscountType() {
    const id_tipo_descuento = document.getElementById('update_id_tipo_descuento')?.value;
    const id_cliente = document.getElementById('update_id_cliente')?.value;
    const id_estado = document.getElementById('update_id_estado')?.value;
    const porcentaje_descuento = document.getElementById('update_porcentaje_descuento')?.value;
    const modificado_por = document.getElementById('update_modificado_por')?.value;
    const fecha_modificacion = document.getElementById('update_fecha_modificacion')?.value;

    if (!id_tipo_descuento ||!id_cliente ||!id_estado ||!porcentaje_descuento ||!modificado_por ||!fecha_modificacion) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/discount-types/${id_tipo_descuento}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id_cliente, 
                id_estado, 
                porcentaje_descuento, 
                modificado_por, 
                fecha_modificacion 
            })
        });

        if (response.ok) {
            alert('Tipo de descuento actualizado exitosamente');
            fetchDiscountTypes();
        } else {
            const errorData = await response.json();
            alert(`Error updating discount type: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating discount type:', error);
        alert('Error updating discount type.');
    }
}

// Delete a discount type
async function deleteDiscountType() {
    const id_tipo_descuento = document.getElementById('delete_id_tipo_descuento')?.value;

    if (!id_tipo_descuento) {
        alert('Por favor, ingresa el ID del tipo de descuento a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/discount-types/${id_tipo_descuento}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Tipo de descuento eliminado exitosamente');
            fetchDiscountTypes();
        } else {
            const errorData = await response.json();
            alert(`Error deleting discount type: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting discount type:', error);
        alert('Error deleting discount type.');
    }
}
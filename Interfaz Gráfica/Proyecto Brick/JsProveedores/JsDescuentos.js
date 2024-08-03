// Fetch discounts
async function fetchDiscounts() {
    try {
        const response = await fetch('http://localhost:5000/api/discounts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('discounts-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Descuento</th>
                            <th>ID Cliente</th>
                            <th>ID Tipo Descuento</th>
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
                        <td>${row.FIDE_DESCUENTOS_V_Id_descuento_PK}</td>
                        <td>${row.FIDE_DESCUENTOS_V_Id_cliente_FK}</td>
                        <td>${row.FIDE_DESCUENTOS_V_Id_tipo_descuento_FK}</td>
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
        console.error('Error fetching discounts:', error);
    }
}

// Create a new discount
async function createDiscount() {
    const id_descuento = document.getElementById('create_id_descuento')?.value;
    const id_cliente = document.getElementById('create_id_cliente')?.value;
    const id_tipo_descuento = document.getElementById('create_id_tipo_descuento')?.value;
    const creado_por = document.getElementById('create_creado_por')?.value;
    const fecha_creacion = document.getElementById('create_fecha_creacion')?.value;

    if (!id_descuento || !id_cliente || !id_tipo_descuento || !creado_por || !fecha_creacion) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/api/discounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id_descuento, 
                id_cliente, 
                id_tipo_descuento, 
                creado_por, 
                fecha_creacion 
            })
        });

        if (response.ok) {
            alert('Descuento creado exitosamente');
            fetchDiscounts();
        } else {
            const errorData = await response.json();
            alert(`Error creating discount: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating discount:', error);
        alert('Error creating discount.');
    }
}

// Read a discount
async function readDiscount() {
    const id_descuento = document.getElementById('read_id_descuento').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/discounts/${id_descuento}`);
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
                'ID Descuento',
                'ID Cliente',
                'ID Tipo Descuento',
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
                idCell.textContent = item.FIDE_DESCUENTOS_V_Id_descuento_PK;
                row.appendChild(idCell);

                const clienteCell = document.createElement('td');
                clienteCell.textContent = item.FIDE_DESCUENTOS_V_Id_cliente_FK;
                row.appendChild(clienteCell);

                const tipoDescuentoCell = document.createElement('td');
                tipoDescuentoCell.textContent = item.FIDE_DESCUENTOS_V_Id_tipo_descuento_FK;
                row.appendChild(tipoDescuentoCell);

                const creadoPorCell = document.createElement('td');
                creadoPorCell.textContent = item.V_Creado_por;
                row.appendChild(creadoPorCell);

                const modificadoPorCell = document.createElement('td');
                modificadoPorCell.textContent = item.V_Modificado_por;
                row.appendChild(modificadoPorCell);

                const fechaCreacionCell = document.createElement('td');
                fechaCreacionCell.textContent = item.V_Fecha_de_creacion;
                row.appendChild(fechaCreacionCell);

                const fechaModificacionCell = document.createElement('td');
                fechaModificacionCell.textContent = item.V_Fecha_de_modificacion;
                row.appendChild(fechaModificacionCell);

                const accionCell = document.createElement('td');
                accionCell.textContent = item.V_Accion;
                row.appendChild(accionCell);

                const estadoCell = document.createElement('td');
                estadoCell.textContent = item.V_Estado;
                row.appendChild(estadoCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            tableContainer.appendChild(table);
        } else {
            document.getElementById('read-table').innerHTML = '<p>No se encontraron datos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('read-table').innerHTML = `<p>Ocurrió un error al leer el descuento: ${error.message}</p>`;
    }
}

// Update a discount
async function updateDiscount() {
    const id_descuento = document.getElementById('update_id_descuento')?.value;
    const id_cliente = document.getElementById('update_id_cliente')?.value;
    const id_tipo_descuento = document.getElementById('update_id_tipo_descuento')?.value;
    const modificado_por = document.getElementById('update_modificado_por')?.value;
    const fecha_modificacion = document.getElementById('update_fecha_modificacion')?.value;

    if (!id_descuento || !id_cliente || !id_tipo_descuento || !modificado_por || !fecha_modificacion) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/discounts/${id_descuento}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id_cliente, 
                id_tipo_descuento, 
                modificado_por, 
                fecha_modificacion 
            })
        });

        if (response.ok) {
            alert('Descuento actualizado exitosamente');
            fetchDiscounts();
        } else {
            const errorData = await response.json();
            alert(`Error updating discount: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating discount:', error);
        alert('Error updating discount.');
    }
}

// Delete a discount
async function deleteDiscount() {
    const id_descuento = document.getElementById('delete_id_descuento')?.value;

    if (!id_descuento) {
        alert('Por favor, ingresa el ID del descuento a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/discounts/${id_descuento}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Descuento eliminado exitosamente');
            fetchDiscounts();
        } else {
            const errorData = await response.json();
            alert(`Error deleting discount: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting discount:', error);
        alert('Error deleting discount.');
    }
}
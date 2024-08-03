async function fetchProveedores() {
    try {
        const response = await fetch('http://localhost:5000/api/proveedores');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('proveedores-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Proveedor</th>
                            <th>Nombre Proveedor</th>
                            <th>Correo Proveedor</th>
                            <th>Producto Proveedor</th>
                            <th>Teléfono Proveedor</th>
                            <th>Dirección Proveedor</th>
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
                        <td>${row.FIDE_PROVEEDORES_V_Id_proveedor_PK}</td>
                        <td>${row.V_Nom_provedor}</td>
                        <td>${row.V_Correo_proveedor}</td>
                        <td>${row.V_Producto_proveedor}</td>
                        <td>${row.V_Tel_proveedor}</td>
                        <td>${row.V_Direccion_proveedor}</td>
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
        console.error('Error fetching proveedores:', error);
    }
}

// Create a new supplier
async function createProveedor() {
    const id_proveedor = document.getElementById('create_id_proveedor')?.value;
    const nom_proveedor = document.getElementById('create_nom_proveedor')?.value;
    const correo_proveedor = document.getElementById('create_correo_proveedor')?.value;
    const producto_proveedor = document.getElementById('create_producto_proveedor')?.value;
    const tel_proveedor = document.getElementById('create_tel_proveedor')?.value;
    const direccion_proveedor = document.getElementById('create_direccion_proveedor')?.value;
    const creado_por = document.getElementById('create_creado_por')?.value;
    const fecha_creacion = document.getElementById('create_fecha_creacion')?.value;

    if (!id_proveedor || !nom_proveedor || !correo_proveedor || !producto_proveedor || !tel_proveedor || !direccion_proveedor || !creado_por || !fecha_creacion) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/api/proveedores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id_proveedor, 
                nom_proveedor, 
                correo_proveedor, 
                producto_proveedor, 
                tel_proveedor, 
                direccion_proveedor, 
                creado_por, 
                fecha_creacion 
            })
        });

        if (response.ok) {
            alert('Proveedor creado exitosamente');
            fetchProveedores();
        } else {
            const errorData = await response.json();
            alert(`Error creating supplier: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating supplier:', error);
        alert('Error creating supplier.');
    }
}

// Read a supplier
async function readProveedor() {
    const id_proveedor = document.getElementById('read_id_proveedor').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/proveedores/${id_proveedor}`);
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
                'ID Proveedor',
                'Nombre Proveedor',
                'Correo Proveedor',
                'Producto Proveedor',
                'Teléfono Proveedor',
                'Dirección Proveedor',
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
                idCell.textContent = item.FIDE_PROVEEDORES_V_Id_proveedor_PK || '';
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = item.V_Nom_provedor || '';
                row.appendChild(nameCell);

                const emailCell = document.createElement('td');
                emailCell.textContent = item.V_Correo_proveedor || '';
                row.appendChild(emailCell);

                const productCell = document.createElement('td');
                productCell.textContent = item.V_Producto_proveedor || '';
                row.appendChild(productCell);

                const phoneCell = document.createElement('td');
                phoneCell.textContent = item.V_Tel_proveedor || '';
                row.appendChild(phoneCell);

                const addressCell = document.createElement('td');
                addressCell.textContent = item.V_Direccion_proveedor || '';
                row.appendChild(addressCell);

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
        document.getElementById('read-table').innerHTML = `<p>Ocurrió un error al leer el proveedor: ${error.message}</p>`;
    }
}

// Update a supplier
async function updateProveedor() {
    const id_proveedor = document.getElementById('update_id_proveedor')?.value;
    const nom_proveedor = document.getElementById('update_nom_proveedor')?.value;
    const correo_proveedor = document.getElementById('update_correo_proveedor')?.value;
    const producto_proveedor = document.getElementById('update_producto_proveedor')?.value;
    const tel_proveedor = document.getElementById('update_tel_proveedor')?.value;
    const direccion_proveedor = document.getElementById('update_direccion_proveedor')?.value;
    const modificado_por = document.getElementById('update_modificado_por')?.value;
    const fecha_modificacion = document.getElementById('update_fecha_modificacion')?.value;

    if (!id_proveedor ||!nom_proveedor ||!correo_proveedor ||!producto_proveedor ||!tel_proveedor ||!direccion_proveedor ||!modificado_por ||!fecha_modificacion) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/proveedores/${id_proveedor}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                nom_proveedor, 
                correo_proveedor, 
                producto_proveedor, 
                tel_proveedor, 
                direccion_proveedor, 
                modificado_por, 
                fecha_modificacion 
            })
        });

        if (response.ok) {
            alert('Proveedor actualizado exitosamente');
            fetchProveedores();
        } else {
            const errorData = await response.json();
            alert(`Error updating supplier: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating supplier:', error);
        alert('Error updating supplier.');
    }
}

// Delete a supplier
async function deleteProveedor() {
    const id_proveedor = document.getElementById('delete_id_proveedor')?.value;

    if (!id_proveedor) {
        alert('Por favor, ingresa el ID del proveedor a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/proveedores/${id_proveedor}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Proveedor eliminado exitosamente');
            fetchProveedores();
        } else {
            const errorData = await response.json();
            alert(`Error deleting supplier: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting supplier:', error);
        alert('Error deleting supplier.');
    }
}
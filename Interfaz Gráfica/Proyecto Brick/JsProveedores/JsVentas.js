async function fetchVentas() {
    try {
        const response = await fetch('http://localhost:5000/api/ventas');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('ventas-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Venta</th>
                            <th>ID Factura</th>
                            <th>ID Producto</th>
                            <th>ID Local</th>
                            <th>ID Entrega</th>
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
                        <td>${row.FIDE_VENTAS_V_Id_venta_PK}</td>
                        <td>${row.FIDE_VENTAS_V_Id_factura_FK}</td>
                        <td>${row.FIDE_VENTAS_V_Id_producto_FK}</td>
                        <td>${row.FIDE_VENTAS_V_Id_local_FK}</td>
                        <td>${row.FIDE_VENTAS_V_Id_entrega_FK}</td>
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
        console.error('Error fetching ventas:', error);
    }
}

// Create a new sale
async function createVenta() {
    const id_venta = document.getElementById('create_id_venta')?.value;
    const id_factura = document.getElementById('create_id_factura')?.value;
    const id_producto = document.getElementById('create_id_producto')?.value;
    const id_local = document.getElementById('create_id_local')?.value;
    const id_entrega = document.getElementById('create_id_entrega')?.value;
    const creado_por = document.getElementById('create_creado_por')?.value;
    const fecha_creacion = document.getElementById('create_fecha_creacion')?.value;

    if (!id_venta || !id_factura || !id_producto || !id_local || !id_entrega || !creado_por || !fecha_creacion) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/api/ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id_venta, 
                id_factura, 
                id_producto, 
                id_local, 
                id_entrega, 
                creado_por, 
                fecha_creacion 
            })
        });

        if (response.ok) {
            alert('Venta creada exitosamente');
            fetchVentas();
        } else {
            const errorData = await response.json();
            alert(Error creating venta: ${errorData.message});
        }
    } catch (error) {
        console.error('Error creating venta:', error);
        alert('Error creating venta.');
    }
}

async function readVenta() {
    const id_venta = document.getElementById('read_id_venta').value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/ventas/${id_venta}`);
        if (!response.ok) {
            throw new Error(HTTP error! Status: ${response.status});
        }
        const data = await response.json();
        console.log('API response:', data);

        if (data.length > 0) {
            const tableContainer = document.getElementById('read-table');
            tableContainer.innerHTML = '';

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const columns = [
                'ID Venta',
                'ID Factura',
                'ID Producto',
                'ID Local',
                'ID Entrega',
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
                idCell.textContent = item.FIDE_VENTAS_V_Id_venta_PK || '';
                row.appendChild(idCell);

                const idFacturaCell = document.createElement('td');
                idFacturaCell.textContent = item.FIDE_VENTAS_V_Id_factura_FK || '';
                row.appendChild(idFacturaCell);

                const idProductoCell = document.createElement('td');
                idProductoCell.textContent = item.FIDE_VENTAS_V_Id_producto_FK || '';
                row.appendChild(idProductoCell);

                const idLocalCell = document.createElement('td');
                idLocalCell.textContent = item.FIDE_VENTAS_V_Id_local_FK || '';
                row.appendChild(idLocalCell);

                const idEntregaCell = document.createElement('td');
                idEntregaCell.textContent = item.FIDE_VENTAS_V_Id_entrega_FK || '';
                row.appendChild(idEntregaCell);

                const creadoPorCell = document.createElement('td');
                creadoPorCell.textContent = item.V_Creado_por || '';
                row.appendChild(creadoPorCell);

                const modificadoPorCell = document.createElement('td');
                modificadoPorCell.textContent = item.V_Modificado_por || '';
                row.appendChild(modificadoPorCell);

                const fechaCreacionCell = document.createElement('td');
                fechaCreacionCell.textContent = item.V_Fecha_de_creacion || '';
                row.appendChild(fechaCreacionCell);

                const fechaModificacionCell = document.createElement('td');
                fechaModificacionCell.textContent = item.V_Fecha_de_modificacion || '';
                row.appendChild(fechaModificacionCell);

                const accionCell = document.createElement('td');
                accionCell.textContent = item.V_Accion || '';
                row.appendChild(accionCell);

                const estadoCell = document.createElement('td');
                estadoCell.textContent = item.V_Estado || '';
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
        document.getElementById('read-table').innerHTML = `<p>Ocurrió un error al leer la venta: ${error.message}</p>`;
    }
}

// Update a sale
async function updateVenta() {
    const id_venta = document.getElementById('update_id_venta')?.value;
    const id_factura = document.getElementById('update_id_factura')?.value;
    const id_producto = document.getElementById('update_id_producto')?.value;
    const id_local = document.getElementById('update_id_local')?.value;
    const id_entrega = document.getElementById('update_id_entrega')?.value;
    const modificado_por = document.getElementById('update_modificado_por')?.value;
    const fecha_modificacion = document.getElementById('update_fecha_modificacion')?.value;

    if (!id_venta || !id_factura || !id_producto || !id_local || !id_entrega || !modificado_por || !fecha_modificacion) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/ventas/${id_venta}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id_factura, 
                id_producto, 
                id_local, 
                id_entrega, 
                modificado_por, 
                fecha_modificacion 
            })
        });

        if (response.ok) {
            alert('Venta actualizada exitosamente');
            fetchVentas();
        } else {
            const errorData = await response.json();
            alert(Error updating venta: ${errorData.message});
        }
    } catch (error) {
        console.error('Error updating venta:', error);
        alert('Error updating venta.');
    }
}

// Delete a sale
async function deleteVenta() {
    const id_venta = document.getElementById('delete_id_venta')?.value;

    if (!id_venta) {
        alert('Por favor, ingresa el ID de la venta a eliminar.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/ventas/${id_venta}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Venta eliminada exitosamente');
            fetchVentas();
        } else {
            const errorData = await response.json();
            alert(Error deleting venta: ${errorData.message});
        }
    } catch (error) {
        console.error('Error deleting venta:', error);
        alert('Error deleting venta.');
    }
}

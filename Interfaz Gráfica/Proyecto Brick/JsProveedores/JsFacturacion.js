async function fetchInvoices() {
    try {
        const response = await fetch('http://localhost:5000/api/invoices');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const table = document.getElementById('invoices-table');
        if (table) {
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID Factura</th>
                            <th>ID Producto</th>
                            <th>ID Descuento</th>
                            <th>ID Cliente</th>
                            <th>ID Local</th>
                            <th>Cantidad Producto</th>
                            <th>Precio Subtotal</th>
                            <th>Precio Total</th>
                            <th>Fecha Pago</th>
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
                        <td>${row.FIDE_FACTURACION_V_Id_factura_PK}</td>
                        <td>${row.FIDE_FACTURACION_V_Id_producto_FK}</td>
                        <td>${row.FIDE_FACTURACION_V_Id_descuento_FK}</td>
                        <td>${row.FIDE_FACTURACION_V_Id_cliente_FK}</td>
                        <td>${row.FIDE_FACTURACION_V_Id_local_FK}</td>
                        <td>${row.V_Cantidad_producto}</td>
                        <td>${row.V_Precio_Subtotal}</td>
                        <td>${row.V_Precio_Total}</td>
                        <td>${row.V_Fecha_pago}</td>
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
        console.error('Error fetching invoices:', error);
    }
}

// Create a new invoice
async function createInvoice() {
    const id_factura = document.getElementById('create_id_factura')?.value;
    const id_producto = document.getElementById('create_id_producto')?.value;
    const id_descuento = document.getElementById('create_id_descuento')?.value;
    const id_cliente = document.getElementById('create_id_cliente')?.value;
    const id_local = document.getElementById('create_id_local')?.value;
    const cantidad_producto = document.getElementById('create_cantidad_producto')?.value;
    const precio_subtotal = document.getElementById('create_precio_subtotal')?.value;
    const precio_total = document.getElementById('create_precio_total')?.value;
    const fecha_pago = document.getElementById('create_fecha_pago')?.value;
    const creado_por = document.getElementById('create_creado_por')?.value;

    if (!id_factura || !id_producto || !id_descuento || !id_cliente || !id_local || !cantidad_producto || !precio_subtotal || !precio_total || !fecha_pago || !creado_por) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/api/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_factura,
                id_producto,
                id_descuento,
                id_cliente,
                id_local,
                cantidad_producto,
                precio_subtotal,
                precio_total,
                fecha_pago,
                creado_por
            })
        });

        if (response.ok) {
            alert('Factura creada exitosamente');
            fetchInvoices();
        } else {
            const errorData = await response.json();
            alert(`Error creating invoice: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error creating invoice:', error);
        alert('Error creating invoice.');
    }
}

// Read an invoice
async function readInvoice() {
    const id_factura = document.getElementById('read_id_factura')?.value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/invoices/${id_factura}`);
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
                'ID Factura',
                'ID Producto',
                'ID Descuento',
                'ID Cliente',
                'ID Local',
                'Cantidad Producto',
                'Precio Subtotal',
                'Precio Total',
                'Fecha Pago',
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
                idCell.textContent = item.FIDE_FACTURACION_V_Id_factura_PK || '';
                row.appendChild(idCell);

                const productoCell = document.createElement('td');
                productoCell.textContent = item.FIDE_FACTURACION_V_Id_producto_FK || '';
                row.appendChild(productoCell);

                const descuentoCell = document.createElement('td');
                descuentoCell.textContent = item.FIDE_FACTURACION_V_Id_descuento_FK || '';
                row.appendChild(descuentoCell);

                const clienteCell = document.createElement('td');
                clienteCell.textContent = item.FIDE_FACTURACION_V_Id_cliente_FK || '';
                row.appendChild(clienteCell);

                const localCell = document.createElement('td');
                localCell.textContent = item.FIDE_FACTURACION_V_Id_local_FK || '';
                row.appendChild(localCell);

                const cantidadCell = document.createElement('td');
                cantidadCell.textContent = item.V_Cantidad_producto || '';
                row.appendChild(cantidadCell);

                const subtotalCell = document.createElement('td');
                subtotalCell.textContent = item.V_Precio_Subtotal || '';
                row.appendChild(subtotalCell);

                const totalCell = document.createElement('td');
                totalCell.textContent = item.V_Precio_Total || '';
                row.appendChild(totalCell);

                const fechaPagoCell = document.createElement('td');
                fechaPagoCell.textContent = item.V_Fecha_pago || '';
                row.appendChild(fechaPagoCell);

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
        document.getElementById('read-table').innerHTML = `<p>Ocurrió un error al leer la factura: ${error.message}</p>`;
    }
}

// Update an invoice
async function updateInvoice() {
    const id_factura = document.getElementById('update_id_factura')?.value;
    const id_producto = document.getElementById('update_id_producto')?.value;
    const id_descuento = document.getElementById('update_id_descuento')?.value;
    const id_cliente = document.getElementById('update_id_cliente')?.value;
    const id_local = document.getElementById('update_id_local')?.value;
    const cantidad_producto = document.getElementById('update_cantidad_producto')?.value;
    const precio_subtotal = document.getElementById('update_precio_subtotal')?.value;
    const precio_total = document.getElementById('update_precio_total')?.value;
    const fecha_pago = document.getElementById('update_fecha_pago')?.value;
    const modificado_por = document.getElementById('update_modificado_por')?.value;

    if (!id_factura || !id_producto || !id_descuento || !id_cliente || !id_local || !cantidad_producto || !precio_subtotal || !precio_total || !fecha_pago || !modificado_por) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/invoices/${id_factura}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_producto,
                id_descuento,
                id_cliente,
                id_local,
                cantidad_producto,
                precio_subtotal,
                precio_total,
                fecha_pago,
                modificado_por
            })
        });

        if (response.ok) {
            alert('Factura actualizada exitosamente');
            fetchInvoices();
        } else {
            const errorData = await response.json();
            alert(`Error updating invoice: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating invoice:', error);
        alert('Error updating invoice.');
    }
}

// Delete an invoice
async function deleteInvoice() {
    const id_factura = document.getElementById('delete_id_factura')?.value;

    if (!id_factura) {
        alert('Por favor, ingresa el ID de la factura a eliminar.');
        return;
    }
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/invoices/${id_factura}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Factura eliminada exitosamente');
            fetchInvoices();
        } else {
            const errorData = await response.json();
            alert(`Error deleting invoice: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error deleting invoice:', error);
        alert('Error deleting invoice.');
    }
}

// Add event listeners to the buttons
document.getElementById('fetch-invoices-btn').addEventListener('click', fetchInvoices);
document.getElementById('create-invoice-btn').addEventListener('click', createInvoice);
document.getElementById('read-invoice-btn').addEventListener('click', readInvoice);
document.getElementById('update-invoice-btn').addEventListener('click', updateInvoice);
document.getElementById('delete-invoice-btn').addEventListener('click', deleteInvoice);
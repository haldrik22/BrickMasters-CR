document.addEventListener('DOMContentLoaded', () => {
    const productEditButtons = document.querySelectorAll('.edit');
    const productDeleteButtons = document.querySelectorAll('.delete');

    // Función para mostrar el formulario de edición de producto
    const showEditForm = (product) => {
        // Crea el formulario de edición de producto
        const editForm = document.createElement('form');
        editForm.innerHTML = `
            <div class="dropdown-item">
                <label for="nombre_producto_edit" class="form-label">Nombre del producto</label>
                <input type="text" class="form-control" id="nombre_producto_edit" value="${product.querySelector('a').textContent}">
            </div>
            <div class="dropdown-item">
                <label for="precio_edit" class="form-label">Precio</label>
                <input type="number" step="0.01" class="form-control" id="precio_edit" value="${product.querySelector('.text-primary').textContent.slice(1)}">
            </div>
            <div class="dropdown-item">
                <button type="submit" class="btn btn-primary">Guardar cambios</button>
            </div>
        `;

        // Agrega el formulario de edición al menú desplegable
        product.querySelector('.dropdown-menu').appendChild(editForm);

        // Agrega un evento submit al formulario de edición
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Actualiza el producto con los nuevos valores
            product.querySelector('a').textContent = editForm.querySelector('#nombre_producto_edit').value;
            product.querySelector('.text-primary').textContent = `$${editForm.querySelector('#precio_edit').value}`;
            // Elimina el formulario de edición
            editForm.remove();
        });
    };

    // Agrega un evento click a los botones de editar producto
    productEditButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const product = button.closest('.product-item');
            showEditForm(product);
        });
    });

    // Función para eliminar un producto
    const deleteProduct = (product) => {
        product.remove();
    };

    // Agrega un evento click a los botones de eliminar producto
    productDeleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const product = button.closest('.product-item');
            if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                deleteProduct(product);
            }
        });
    });
});
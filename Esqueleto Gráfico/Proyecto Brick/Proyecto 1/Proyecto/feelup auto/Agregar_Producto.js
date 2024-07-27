document.addEventListener('DOMContentLoaded', () => {
    const productTable = document.getElementById('productsTable');
    const tbody = productTable.querySelector('tbody');

    // Dummy data - Replace this with actual data from your server
    let products = [];

    // Function to display products
    const displayProducts = () => {
        tbody.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.nombre}</td>
                <td>${product.rango_edad}</td>
                <td>${product.detalles}</td>
                <td><img src="${product.imagen}" alt="${product.nombre}" width="100"></td>
                <td>${product.precio}</td>
                <td>${product.cantidad}</td>
                <td>
                    <button class="btn btn-secondary edit">Editar</button>
                    <button class="btn btn-danger delete">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners for edit and delete buttons
        const editButtons = document.querySelectorAll('.edit');
        editButtons.forEach((button, index) => button.addEventListener('click', () => editProduct(products[index])));

      const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach((button, index) => button.addEventListener('click', () => deleteProduct(products[index])));
    };

    // Function to add a product
    const addProduct = (product) => {
        products.push(product);
        displayProducts();
    };

    // Function to edit a product
    const editProduct = (product) => {
        // Implement your edit logic here
        console.log('Edit product:', product);
    };

    // Function to delete a product
    const deleteProduct = (product) => {
        if (confirm('Are you sure you want to delete this product?')) {
            products = products.filter(p => p.id !== product.id);
            displayProducts();
        }
    };

    // Add a product on form submit
    document.getElementById('Agregar_Producto').addEventListener('submit', (e) => {
        e.preventDefault();
        const nombreProducto = document.getElementById('nombre_producto').value;
        const rangoEdad = document.getElementById('rango_edad').value;
        const detallesJuego = document.getElementById('detalles_juego').value;
        const imagenProducto = document.getElementById('product-image').files[0];
        const precio = document.getElementById('precio').value;
        const cantidad = document.getElementById('cantidad').value;

        const newProduct = {
            id: products.length + 1,
            nombre: nombreProducto,
            rango_edad: rangoEdad,
            detalles: detallesJuego,
            imagen: URL.createObjectURL(imagenProducto),
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad)
        };

        addProduct(newProduct);

        // Reset the form
        document.getElementById('Agregar_Producto').reset();
    });

    // Display products on load
    displayProducts();
});

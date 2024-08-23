// ----------------------------------------TABLAS----------------------------------------
// TABLA CATÁLOGO
// ---------------------------------------
// Función: Obtener Datos de la Tabla Catalogo
// ---------------------------------------
async function fetchCatalogo() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/catalogo');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const productList = document.getElementById('product-list');
        if (productList) {
            productList.innerHTML = '';
            data.forEach(product => {
                const productHtml = `
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="product-item">
                        <div class="position-relative bg-light overflow-hidden">
                            <img class="img-fluid w-100" src="${product.V_Image_Path}" alt="${product.V_Nom_producto}">
                            <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">Nuevo</div>
                        </div>
                        <div class="text-center p-4">
                            <a class="d-block h5 mb-2" href="#">${product.V_Nom_producto}</a>
                            <span class="text-primary me-1">$${product.V_Precio_producto}</span>
                            <button type="button" class="btn btn-primary mt-2" onclick="showProductDetails(${product.FIDE_CATALOGO_V_Id_producto_PK})">Ver</button>
                        </div>
                    </div>
                </div>`;
                productList.innerHTML += productHtml;
            });
        }
    } catch (error) {
        console.error('Error fetching catalogo:', error);
    }
}

// ---------------------------------------
// Función: Mostrar Detalles del Producto en un Modal
// ---------------------------------------
async function showProductDetails(productId) {
    try {
        console.log("Fetching details for product ID:", productId);
        
        const response = await fetch(`http://127.0.0.1:5000/api/catalogo/detalles/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const product = await response.json();
        console.log("Product Data received:", product);

        if (product && product.length > 0) {
            const modalContent = document.getElementById('product-modal-content');
            const productDetails = product[0];
            
            if (modalContent) {
                modalContent.innerHTML = `
                    <div class="modal-header">
                        <h5 class="modal-title">${productDetails.V_NOM_PRODUCTO}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-5">
                                <img class="img-fluid w-100" src="${productDetails.V_IMAGE_PATH}" alt="${productDetails.V_NOM_PRODUCTO}">
                            </div>
                            <div class="col-md-7">
                                <h6 class="mt-3"><strong>Detalles</strong></h6>
                                <p>${productDetails.V_DESCRIPCION_PRODUCTO}</p>
                                <p><strong>Precio: </strong>$${productDetails.V_PRECIO_PRODUCTO}</p>
                                <p><strong>Cantidad Disponible: </strong>${productDetails.V_CANTIDAD_PRODUCTO}</p>
                                <button type="button" class="btn btn-primary mt-3" onclick="addToCart(${productDetails.FIDE_CATALOGO_V_ID_PRODUCTO_PK})">Agregar a Carrito</button>
                            </div>
                        </div>
                    </div>`;
            }

            // Trigger modal display
            const modal = new bootstrap.Modal(document.getElementById('product-modal'));
            modal.show();
        } else {
            console.error('No product details found for ID:', productId);
        }

    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}


function addToCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("Current cart items:", JSON.parse(localStorage.getItem("cartItems")));


    fetch(`http://127.0.0.1:5000/api/catalogo/detalles/${productId}`)
        .then(response => response.json())
        .then(product => {
            console.log("Fetched product data:", product);
            if (product && product.length > 0) {
                let item = product[0];
                console.log("Product details being processed:", item); // Assuming that the first element is the correct product
                let cartItem = cartItems.find(item => item.id === productId);

                if (cartItem) {
                    // Increase quantity if item already exists in the cart
                    cartItem.quantity += 1;
                } else {
                    // Add new item to the cart with the correct properties
                    cartItem = {
                        id: item.FIDE_CATALOGO_V_ID_PRODUCTO_PK,
                        name: item.V_NOM_PRODUCTO,  // Correctly set name
                        price: item.V_PRECIO_PRODUCTO,  // Correctly set price
                        quantity: 1
                    };
                    cartItems.push(cartItem);
                }

                console.log('Item being added to cart:', cartItem); // Debugging line

                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                alert(`Producto ${item.V_NOM_PRODUCTO} agregado al carrito.`);
            } else {
                alert('Producto no encontrado.');
            }
        })
        .catch(error => {
            console.error('Error al agregar el producto al carrito:', error);
            alert('Error al agregar el producto al carrito.');
        });
}

// Call the fetchCatalogo function when the page is loaded
window.onload = fetchCatalogo;

function loadScripts() {
    return new Promise((resolve, reject) => {
        const script1 = document.createElement('script');
        script1.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        script1.onload = () => {
            const script2 = document.createElement('script');
            script2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.21/jspdf.plugin.autotable.min.js";
            script2.onload = resolve;
            script2.onerror = reject;
            document.head.appendChild(script2);
        };
        script1.onerror = reject;
        document.head.appendChild(script1);
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    await loadScripts(); 
    const { jsPDF } = window.jspdf;

    const cartItemsDiv = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-button");

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let descuento = 0;

    async function fetchClientDiscount() {
        try {
            const sessionResponse = await fetch("http://127.0.0.1:5000/api/session", {
                method: "GET",
                credentials: "include"
            });
            const sessionData = await sessionResponse.json();
            const clientId = sessionData.client_id;

            const discountResponse = await fetch(`http://127.0.0.1:5000/api/cliente/${clientId}/descuento`);
            const discountData = await discountResponse.json();
            descuento = discountData.descuento || 0;

        } catch (error) {
            console.error('Error fetching client discount:', error);
        }
    }

    async function fetchProductDetails(productId) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/cart-product/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    async function displayCartItems() {
        await fetchClientDiscount();
        cartItemsDiv.innerHTML = "";
        if (cartItems.length === 0) {
            cartItemsDiv.innerHTML = "<p>No hay productos en el carrito.</p>";
            return;
        }

        let total = 0;

        for (const item of cartItems) {
            const productDetails = await fetchProductDetails(item.id);
            const product = productDetails[0];

            const subtotal = item.quantity * item.price;
            total += subtotal;

            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item", "mb-4", "p-3", "border", "rounded", "position-relative");
            itemDiv.style.display = "flex";
            itemDiv.style.alignItems = "flex-start";
            itemDiv.style.justifyContent = "space-between";

            itemDiv.innerHTML = `
                <div style="position: relative; display: flex; width: 100%;">
                    <div style="flex-shrink: 0; width: 150px;">
                        <img src="${product.V_IMAGE_PATH}" alt="${product.V_NOM_PRODUCTO}" class="img-fluid">
                    </div>
                    <div style="flex-grow: 1; margin-left: 20px;">
                        <h5>${product.V_NOM_PRODUCTO}</h5>
                        <p>${product.V_DESCRIPCION_PRODUCTO}</p>
                        <p><strong>Proveedor:</strong> ${product.V_NOM_PROVEDOR || 'Sin definir'}</p>
                    </div>
                    <div class="d-flex flex-column align-items-end" style="margin-left: 20px;">
                        <button class="btn btn-danger btn-sm mb-3" style="position: absolute; top: 0; right: 0;" onclick="removeFromCart(${item.id})">Remover</button>
                        <div class="d-flex align-items-center mt-5">
                            <label for="quantity-${item.id}" class="form-label me-2"><strong>Cantidad:</strong></label>
                            <input id="quantity-${item.id}" type="number" class="form-control w-75 mb-3" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                        </div>
                        <p><strong>Subtotal:</strong> $${subtotal}</p>
                    </div>
                </div>`;
            
            cartItemsDiv.appendChild(itemDiv);
        }

        const discountAmount = total * (descuento / 100);
        const totalWithDiscount = total - discountAmount;

        const totalDiv = document.createElement("div");
        totalDiv.classList.add("text-right");
        totalDiv.innerHTML = `
            <h5>Subtotal: $${total.toFixed(2)}</h5>
            ${descuento > 0 ? `<h6>Descuento: -$${discountAmount.toFixed(2)} (${descuento}%)</h6>` : ''}
            <h5>Total: $${totalWithDiscount.toFixed(2)}</h5>
        `;
        cartItemsDiv.appendChild(totalDiv);
    }

    window.removeFromCart = function(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItems();
    }

    window.updateQuantity = function(productId, newQuantity) {
        const cartItem = cartItems.find(item => item.id === productId);
        cartItem.quantity = parseInt(newQuantity);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItems();
    }

    async function fetchClientAccount() {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/clientes/account", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("No se pudo obtener la información de la cuenta.");
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching client account:", error);
            return null;
        }
    }

    async function fetchLocales() {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/locales", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("No se pudo obtener la información de locales.");
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching locales:", error);
            return [];
        }
    }

    async function checkout() {
        const clientAccount = await fetchClientAccount();
        if (!clientAccount) {
            alert("Error al obtener la información de la cuenta.");
            return;
        }
    
        let clientId;
        try {
            const sessionResponse = await fetch("http://127.0.0.1:5000/api/session", {
                method: "GET",
                credentials: "include"
            });
    
            if (sessionResponse.status === 200) {
                const sessionData = await sessionResponse.json();
                clientId = sessionData.client_id;
            } else {
                throw new Error("Failed to retrieve client ID from session.");
            }
        } catch (error) {
            console.error("Error fetching session data:", error);
            alert("Error al obtener el ID del cliente desde la sesión.");
            return;
        }
    
        const locales = await fetchLocales();
        const id_local = locales[0].FIDE_LOCALES_V_Id_local_PK; 
        
        let facturaId = null; 
        let entregaId = null; 
    

        const discountResponse = await fetch(`http://127.0.0.1:5000/api/cliente/${clientId}/descuento`);
        const discountData = await discountResponse.json();
        const descuento = discountData.descuento || 0;
        const id_descuento = descuento > 0 ? discountData.id_descuento : null; 

        console.log("Discount Data:", discountData);
        console.log("Descuento:", descuento);
        console.log("ID Descuento:", id_descuento);
        
        for (const item of cartItems) {
            const fechaPago = new Date().toISOString().slice(0, 10);
            const precio_subtotal = item.quantity * item.price;
            const precio_total = precio_subtotal * (1 - descuento / 100); 
            const createFacturaResponse = await fetch("http://127.0.0.1:5000/api/facturacion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_producto: item.id,
                    id_descuento: id_descuento,
                    id_cliente: clientId,
                    id_local: id_local,
                    cantidad_producto: item.quantity,
                    precio_subtotal: precio_subtotal,
                    precio_total: precio_total,
                    fecha_pago: fechaPago
                }),
            });
    
            if (!createFacturaResponse.ok) {
                alert("Error al crear la factura.");
                return;
            }
    
            const facturaData = await createFacturaResponse.json();
            facturaId = facturaData.id_factura; 
            console.log(`Factura ID generated: ${facturaId}`);

            const fetchEntregaResponse = await fetch(`http://127.0.0.1:5000/api/entrega/factura/${facturaId}`);
            if (fetchEntregaResponse.ok) {
                const entregaData = await fetchEntregaResponse.json();
                entregaId = entregaData.id_entrega; 
                console.log(`Entrega ID retrieved: ${entregaId}`);
            } else {
                alert("Error al obtener el ID de entrega.");
                return;
            }
    
            console.log(`Factura ID generated: ${facturaId}, Entrega ID: ${entregaId}`);
        }
    
        for (let item of cartItems) {
            const productDetails = await fetchProductDetails(item.id);
            const product = productDetails[0];
            item.V_DESCRIPCION_PRODUCTO = product.V_DESCRIPCION_PRODUCTO;
            item.V_IMAGE_PATH = product.V_IMAGE_PATH;
        }
    
        generatePDF(clientAccount, cartItems, facturaId, entregaId, id_local, descuento); 
        alert("Pedido realizado con éxito. Gracias por tu compra.");
        localStorage.removeItem("cartItems");
        displayCartItems();
        
        setTimeout(() => {
            location.reload();
        }, 1000);
    }    
        
    
    displayCartItems();

    checkoutButton.addEventListener("click", checkout);

    function generatePDF(clientAccount, cartData, facturaId, entregaId, id_local, descuento) {
        const doc = new jsPDF();
    
        doc.setFillColor(216, 19, 36);
        doc.rect(0, 0, 210, 30, 'F');
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text("BrickMasters CR", 10, 20);
    
        doc.setFontSize(12);
        doc.setTextColor(11, 33, 84);
        doc.text(`Factura ID: ${facturaId}`, 10, 40);
        doc.text(`Cliente: ${clientAccount.nom_cliente} ${clientAccount.ape_cliente}`, 10, 50);
        doc.text(`Correo: ${clientAccount.correo_cliente}`, 10, 60);
        doc.text(`Teléfono: ${clientAccount.tel_cliente}`, 10, 70);
        doc.text(`Dirección: ${clientAccount.direccion_cliente}`, 10, 80);
    
        const tableColumnHeaders = ["Producto", "Cantidad", "Precio", "Subtotal"];
        const tableRows = [];
    
        cartData.forEach((item, index) => {
            tableRows.push([
                item.name,
                item.quantity,
                `$${item.price.toFixed(2)}`,
                `$${(item.quantity * item.price).toFixed(2)}`
            ]);
    
            if (item.V_IMAGE_PATH) {
                const img = new Image();
                img.src = item.V_IMAGE_PATH;
                doc.addImage(img, 'JPEG', 10, 100 + (index * 30), 50, 50); 
            }
        });
    
        doc.autoTable({
            head: [tableColumnHeaders],
            body: tableRows,
            startY: 135 + cartData.length * 30, 
            theme: 'grid',
            styles: {
                fontSize: 12,
                font: 'Helvetica',
                textColor: [89, 98, 119],
            },
            headStyles: {
                fillColor: [11, 33, 84],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
            alternateRowStyles: { fillColor: [242, 242, 242] },
            margin: { top: 100, left: 10, right: 10 },
        });
    
        const subtotal = cartData.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        const total = subtotal * (1 - descuento / 100);        
        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 10, doc.previousAutoTable.finalY + 10);
        if (descuento > 0) {
            doc.text(`Descuento Aplicado: ${descuento}%`, 10, doc.previousAutoTable.finalY + 20);
        }
        doc.text(`Total: $${total.toFixed(2)}`, 10, doc.previousAutoTable.finalY + 30);
        doc.text(`Entrega ID: ${entregaId}`, 10, doc.previousAutoTable.finalY + 40);
        doc.text(`Local ID: ${id_local}`, 10, doc.previousAutoTable.finalY + 50);
        
        doc.setFillColor(11, 33, 84);
        doc.rect(0, 280, 210, 15, 'F');
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text("Gracias por su compra en BrickMasters CR", 10, 288);
    
        doc.save("FacturacionBRICKMASTERS.pdf");
    }
    
    
});

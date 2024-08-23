async function registerClient() {
    console.log("Register function called"); 

    const nom_cliente = document.getElementById('regNomCliente')?.value;
    const ape_cliente = document.getElementById('regApeCliente')?.value;
    const correo_cliente = document.getElementById('regCorreoCliente')?.value;
    const tel_cliente = document.getElementById('regTelCliente')?.value;
    const direccion_cliente = document.getElementById('regDireccionCliente')?.value;
    const password = document.getElementById('regPasswordCliente')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_cliente,
                ape_cliente,
                correo_cliente,
                tel_cliente,
                direccion_cliente,
                password
            })
        });

        if (response.ok) {
            alert('Client registered successfully');
            $('#registerModal').modal('hide');
        } else {
            const errorData = await response.json();
            alert(`Error registering client: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error registering client:', error);
        alert('Error registering client.');
    }
}

async function loginClient() {
    const correo_cliente = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                correo_cliente,
                password
            })
        });

        if (response.ok) {
            alert('Login successful');
            // Redirect to the main app page or dashboard
            window.location.href = 'index.html';  // Change to your desired page
        } else {
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in.');
    }
}
// Function to load the client's account info into the modal
async function loadClientAccount() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes/account', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.status === 'error') {
            alert(data.message);
            return;
        }

        document.getElementById('accNomCliente').value = data.nom_cliente;
        document.getElementById('accApeCliente').value = data.ape_cliente;
        document.getElementById('accCorreoCliente').value = data.correo_cliente;
        document.getElementById('accTelCliente').value = data.tel_cliente;
        document.getElementById('accDireccionCliente').value = data.direccion_cliente;
    } catch (error) {
        console.error('Error loading client account:', error);
    }
}

// Function to update the client's account info
async function updateClientAccount() {
    const nom_cliente = document.getElementById('accNomCliente')?.value;
    const ape_cliente = document.getElementById('accApeCliente')?.value;
    const correo_cliente = document.getElementById('accCorreoCliente')?.value;
    const tel_cliente = document.getElementById('accTelCliente')?.value;
    const direccion_cliente = document.getElementById('accDireccionCliente')?.value;
    const password = document.getElementById('accPasswordCliente')?.value || null;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes/account', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                nom_cliente,
                ape_cliente,
                correo_cliente,
                tel_cliente,
                direccion_cliente,
                password
            })
        });

        if (response.ok) {
            alert('Información actualizada exitosamente');
            $('#accountModal').modal('hide');
        } else {
            const errorData = await response.json();
            alert(`Error actualizando la información: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating client account:', error);
        alert('Error actualizando la información.');
    }
}

async function logoutClient() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/clientes/logout', {
            method: 'POST',
            credentials: 'include'  
        });

        if (response.ok) {
            alert('Logout successful');
            window.location.href = 'Login.html'; 
        } else {
            const errorData = await response.json();
            alert(`Error logging out: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('Error logging out.');
    }
}

// Load account info when modal is opened
document.getElementById('accountModal').addEventListener('show.bs.modal', loadClientAccount);


// Function to handle Admin Login
async function registerAdmin() {
    console.log("Register function called for Admin"); 

    const nom_administradores = document.getElementById('regNomAdmin')?.value;
    const ape_administradores = document.getElementById('regApeAdmin')?.value;
    const correo_administradores = document.getElementById('regCorreoAdmin')?.value;
    const tel_administradores = document.getElementById('regTelAdmin')?.value;
    const direccion_administradores = document.getElementById('regDireccionAdmin')?.value;
    const password = document.getElementById('regPasswordAdmin')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/administradores/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom_administradores,
                ape_administradores,
                correo_administradores,
                tel_administradores,
                direccion_administradores,
                password
            })
        });

        if (response.ok) {
            alert('Administrator registered successfully');
            $('#registerModal').modal('hide');
        } else {
            const errorData = await response.json();
            alert(`Error registering administrator: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error registering administrator:', error);
        alert('Error registering administrator.');
    }
}

async function loginAdmin() {
    const correo_administradores = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/administradores/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                correo_administradores,
                password
            })
        });

        if (response.ok) {
            alert('Login successful');
            window.location.href = 'indexadmin.html';  // Redirect to admin dashboard
        } else {
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in.');
    }
}

// Function to handle Admin Logout
async function logoutAdmin() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/administradores/logout', {
            method: 'POST',
            credentials: 'include'  
        });

        if (response.ok) {
            alert('Logout successful');
            window.location.href = 'LoginAdmin.html';  // Redirect to admin login page
        } else {
            const errorData = await response.json();
            alert(`Error logging out: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('Error logging out.');
    }
}
// Function to load the admin's account info into the modal
async function loadAdminAccount() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/administradores/account', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.status === 'error') {
            alert(data.message);
            return;
        }

        document.getElementById('accNomAdmin').value = data.nom_administradores;
        document.getElementById('accApeAdmin').value = data.ape_administradores;
        document.getElementById('accCorreoAdmin').value = data.correo_administradores;
        document.getElementById('accTelAdmin').value = data.tel_administradores;
        document.getElementById('accDireccionAdmin').value = data.direccion_administradores;
    } catch (error) {
        console.error('Error loading admin account:', error);
    }
}

// Function to update the admin's account info
async function updateAdminAccount() {
    const nom_administradores = document.getElementById('accNomAdmin')?.value;
    const ape_administradores = document.getElementById('accApeAdmin')?.value;
    const correo_administradores = document.getElementById('accCorreoAdmin')?.value;
    const tel_administradores = document.getElementById('accTelAdmin')?.value;
    const direccion_administradores = document.getElementById('accDireccionAdmin')?.value;
    const password = document.getElementById('accPasswordAdmin')?.value || null;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/administradores/account', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                nom_administradores,
                ape_administradores,
                correo_administradores,
                tel_administradores,
                direccion_administradores,
                password
            })
        });

        if (response.ok) {
            alert('Información actualizada exitosamente');
            $('#accountModal').modal('hide');
        } else {
            const errorData = await response.json();
            alert(`Error actualizando la información: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error updating admin account:', error);
        alert('Error actualizando la información.');
    }
}

// Load admin account info when modal is opened
document.getElementById('accountModal').addEventListener('show.bs.modal', loadAdminAccount);

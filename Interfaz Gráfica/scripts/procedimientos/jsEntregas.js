// Function to fetch and display data from the FIDE_ENTREGAS_TB table
function fetchEntregas() {
    fetch('http://127.0.0.1:5000/api/entregas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('entregasOutput').textContent = `Error: ${data.error}`;
        } else {
            displayEntregas(data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('entregasOutput').textContent = 'Hubo un error al realizar la solicitud.';
    });
}

// Function to display entregas data in the table
function displayEntregas(entregas) {
    const table = document.getElementById('entregasTable');
    table.innerHTML = '';

    if (entregas.length > 0) {
        const headers = Object.keys(entregas[0]);
        const headerRow = table.insertRow(-1);
        headers.forEach(header => {
            const cell = headerRow.insertCell(-1);
            cell.textContent = header;
        });

        entregas.forEach(row => {
            const tableRow = table.insertRow(-1);
            headers.forEach(header => {
                const cell = tableRow.insertCell(-1);
                cell.textContent = row[header];
            });
        });
    } else {
        table.innerHTML = '<tr><td colspan="100%">No hay datos disponibles.</td></tr>';
    }
}

// Function to filter the table based on search input
function filterEntregas() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const table = document.getElementById('entregasTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        let match = false;
        const cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchValue)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}

// Event listener for search input
document.getElementById('searchBar').addEventListener('input', filterEntregas);

// Event listener for page load to fetch data
document.addEventListener('DOMContentLoaded', fetchEntregas);

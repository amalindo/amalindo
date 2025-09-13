// table-data.js
// Loads table data from data.json and renders it into the table

document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(tableData => {
            const tbody = document.getElementById('table-body');
            tbody.innerHTML = tableData.map(row => `
                <tr>
                    <td>${row.place}</td>
                    <td>${row.name}</td>
                    <td>${row.type}</td>
                </tr>
            `).join('');
        })
        .catch(error => {
            console.error('Error loading table data:', error);
        });
});

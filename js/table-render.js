// Helper functions only, no direct DOM manipulation
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Sort table function
function sortTable(columnIndex) {
    const tbody = document.getElementById('table-body');
    const rows = Array.from(tbody.getElementsByTagName('tr'));
    
    const sortedRows = rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent;
        const bText = b.cells[columnIndex].textContent;
        return aText.localeCompare(bText, 'ar');
    });

    // Clear and repopulate tbody
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    sortedRows.forEach(row => tbody.appendChild(row));
}

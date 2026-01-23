/**
 * Table Data Loader
 * Loads partner data from external JSON file for better performance
 */

var tableData = [];

/**
 * Load table data from JSON file
 * @returns {Promise<Array>} Array of partner data
 */
async function loadTableData() {
    try {
        const response = await fetch('data/partners.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        tableData = await response.json();
        console.log(`Loaded ${tableData.length} partner entries`);
        return tableData;
    } catch (error) {
        console.error('Error loading table data:', error);
        // Return empty array on error
        return [];
    }
}

/**
 * Initialize table after data is loaded
 */
async function initializeTable() {
    await loadTableData();
    
    // Trigger table initialization if DataTables is available
    if (typeof initDataTable === 'function') {
        initDataTable();
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeTable);

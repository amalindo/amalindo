$(document).ready(function() {
    // Initialize DataTable with custom filtering - using tableData from table-config.js
    var table = $('#myTable').DataTable({
        "data": tableData, // Using tableData from table-config.js
        "initComplete": function() {
            updateStatistics(tableData);
            populateFilters(tableData);
        },
        "columns": [
            { "data": "place" },
            { "data": "name" },
            { "data": "type" }
        ],
        "language": {
            "sEmptyTable":     "ليست هناك بيانات متاحة في الجدول",
            "sLoadingRecords": "جارٍ التحميل...",
            "sProcessing":   "جارٍ التحميل...",
            "sLengthMenu":   "أظهر _MENU_ مدخلات",
            "sZeroRecords":  "لم يعثر على أية سجلات",
            "sInfo":         "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
            "sInfoEmpty":    "يعرض 0 إلى 0 من أصل 0 سجل",
            "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
            "sInfoPostFix":  "",
            "sSearch":       "ابحث:",
            "sUrl":         "",
            "oPaginate": {
                "sFirst":    "الأول",
                "sPrevious": "السابق",
                "sNext":     "التالي",
                "sLast":     "الأخير"
            },
            "oAria": {
                "sSortAscending":  ": تفعيل لترتيب العمود تصاعدياً",
                "sSortDescending": ": تفعيل لترتيب العمود تنازلياً"
            }
        },
        "initComplete": function() {
            // Remove default search box as we have our own
            $('.dataTables_filter').hide();
        }
    });

    // Function to update statistics
    function updateStatistics(data) {
        const cities = new Set(data.map(item => item.place));
        const establishments = data.length;
        const types = new Set(data.map(item => item.type));

        $('#citiesCount').text(cities.size);
        $('#establishmentsCount').text(establishments);
        $('#typesCount').text(types.size);

        // Animate the numbers
        $('.stat-box h3').each(function() {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

    // Function to populate filter dropdowns
    function populateFilters(data) {
        const cities = [...new Set(data.map(item => item.place))].sort();
        const types = [...new Set(data.map(item => item.type))].sort();

        cities.forEach(city => {
            $('#cityFilter').append(`<option value="${city}">${city}</option>`);
        });

        types.forEach(type => {
            $('#typeFilter').append(`<option value="${type}">${type}</option>`);
        });
    }

    // Handle filter changes
    $('#cityFilter, #typeFilter').on('change', function() {
        const cityValue = $('#cityFilter').val();
        const typeValue = $('#typeFilter').val();

        // Apply both filters
        table
            .column(0).search(cityValue)
            .column(2).search(typeValue)
            .draw();
    });

    // Handle search input with debouncing
    let searchTimeout;
    $('#searchInput').on('keyup', function() {
        clearTimeout(searchTimeout);
        const value = this.value;
        
        searchTimeout = setTimeout(function() {
            table.search(value).draw();
        }, 300);
    });
});

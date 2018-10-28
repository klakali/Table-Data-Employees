var checkboxes = document.querySelectorAll("input[name=toBeRemoved]");
var removeButton = document.querySelector(".employessData__remove");

//Delate data
function deleteRow(datatable) {
    var confirmation = confirm('Are you sure?');
    if (confirmation == true) {
        var table = document.getElementById("datatable");
        var rowCount = table.rows.length;
        // var i=1 to start after header
        for (var i = 1; i < rowCount; i++) {
            var row = table.rows[i];

            // index of td contain checkbox is 8
            var chkbox = row.cells[0].getElementsByTagName('input')[0];
            if (chkbox.checked == true && chkbox != null) {
                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    }
}
//Highight 
function checkboxStyle() {
    var rowStyle = this.parentNode.parentNode;
    if (this.checked == false) {
        rowStyle.style.backgroundColor = "white";
    }
    if (this.checked) {
        rowStyle.style.backgroundColor = "#ddd";
    }
}

removeButton.addEventListener('click', deleteRow);
checkboxes.forEach(checkbox => checkbox.addEventListener('change', checkboxStyle));

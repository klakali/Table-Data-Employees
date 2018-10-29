var checkboxes = document.querySelectorAll("input[name=toBeRemoved]");
var removeButton = document.querySelector(".employessData__remove");
removeButton.disabled = true;

//Highlight 
function checkboxStyle() {
    var rowStyle = this.parentNode.parentNode;
    if (this.checked == false) {
        rowStyle.style.backgroundColor = "white";
    }
    if (this.checked) {
        rowStyle.style.backgroundColor = "#ddd";

    }
}
//Remove button disabled
function countCheckboxes() {
    var checkboxes = document.querySelectorAll("input[name=toBeRemoved]");
    var count = 0;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === true) {
            count++;
            removeButton.disabled = false;
        }
    }
    if (count === 0) {
        removeButton.disabled = true;
    }
}

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
                removeButton.disabled = true;
            }
        }
    }
}

removeButton.addEventListener('click', deleteRow);
checkboxes.forEach(checkbox => checkbox.addEventListener('change', countCheckboxes));
checkboxes.forEach(checkbox => checkbox.addEventListener('change', checkboxStyle));

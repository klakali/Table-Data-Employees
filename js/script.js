var people = [];

//MODUL: ADD AN EMPLOYEE
var add = document.querySelector("input[type=submit]");

function addEmployee(e) {
    e.stopPropagation();
    e.preventDefault();
    var row = table.insertRow(-1);
    row.classList.add("singleRow");

    singleRowArray.push(row);
    var addCell = row.insertCell(-1);

    addCell.innerHTML = '<input type="checkbox" name="toBeRemoved">'
    addCell.addEventListener('change', countCheckboxes);
    addCell.addEventListener('change', checkboxStyle);

    var employeeFormArray = [""]; // "" added because below 'for funtion' start from 1

    var columnCount = table.rows[0].cells.length;

    for (let i = 1; i < columnCount; i++) {
        let employeeForm = document.querySelector(".addEmployeeForm").elements[i].value;
        employeeFormArray.push(employeeForm); //form values add to the array
        var addCell = row.insertCell(-1);
        addCell.textContent = employeeFormArray[i];

    }
    let j = singleRowArray.length - 1; //to make the 'sort function' works

    let object = {
        name: employeeFormArray[1],
        surname: employeeFormArray[2],
        dateOfBirth: employeeFormArray[3],
        department: employeeFormArray[4],
        salary: employeeFormArray[5],
        role: employeeFormArray[6],
        node: singleRowArray[j] //node to each row

    }
    people.push(object); //new employee added to "people" - for 'sort function' 
}

add.addEventListener("click", addEmployee);

//MODUL: Surname Sort
let singleRowArray = Array.from(document.querySelectorAll(".singleRow"));
var table = document.getElementById("datatable");
var surname = document.querySelector(".surname");
var surnamesAZ = false; //used on the sort event

function peopleToObject() {
    let singleRowArray = Array.from(document.querySelectorAll(".singleRow")); //created to find the children
    let singleRow = document.querySelectorAll(".singleRow");
    for (let i = 0; i < singleRowArray.length; i++) {
        let object = {
            name: singleRowArray[i].children[1].textContent,
            surname: singleRowArray[i].children[2].textContent,
            dateOfBirth: singleRowArray[i].children[3].textContent,
            department: singleRowArray[i].children[4].textContent,
            salary: singleRowArray[i].children[5].textContent,
            role: singleRowArray[i].children[6].textContent,
            node: singleRowArray[i] //node to each row
        };
        people.push(object);
    }
}

peopleToObject();

function sortSurnamesAZ() {
    //compare surnames in the objects
    function compareSurnameAZ(a, b) {
        if (a.surname > b.surname) {
            return 1;
        } else if (a.surname < b.surname) {
            return -1;
        }
    }
    people.sort(compareSurnameAZ); //sort objects in the array "people"

    //changing the order in table - using the node reference
    for (let i = 0; i < people.length; i++) {
        table.appendChild(people[i].node);
    }
}

function sortSurnamesZA() {
    //compare surnames in the objects
    function compareSurnameAZ(a, b) {
        if (a.surname > b.surname) {
            return -1;
        } else if (a.surname < b.surname) {
            return 1;
        }
    }
    people.sort(compareSurnameAZ); //sort objects in the array "people"

    //changing the order in table - using the node reference
    for (let i = 0; i < people.length; i++) {
        table.appendChild(people[i].node);
    }
}

// Surname sort funciton added to the th
surname.addEventListener('click', function () {
    if (surnamesAZ === false) {
        sortSurnamesAZ();
        surnamesAZ = true;
        surname.className = "arrow-up";
        surname.style.cursor = "pointer"; //css is not enough - 'pointer' is removed after click
    } else if (surnamesAZ === true) {
        sortSurnamesZA()
        surnamesAZ = false;
        surname.className = "arrow-down";
        surname.style.cursor = "pointer"; //css is not enough - 'pointer' is removed after click
    }
})
//END --> MODUL: Surname Sort

//MODUL: Salary sort
var salary = document.querySelector(".salary");
var salaryAZ = false;


function sortSalaryAZ() {
    //compare salaries in the objects
    function compareSalaryAZ(a, b) {
        var salaryAsANumberA = parseInt(a.salary);
        var salaryAsANumberB = parseInt(b.salary);
        if (salaryAsANumberA > salaryAsANumberB) {
            return 1;
        } else if (salaryAsANumberA < salaryAsANumberB) {
            return -1;
        }
    }
    people.sort(compareSalaryAZ); //sort objects in the array "people"

    //changing the order in table - using the node reference
    for (var i = 0; i < people.length; i++) {
        table.appendChild(people[i].node);
    }
}

function sortSalaryZA() {
    //compare salaries in the objects
    function compareSalaryAZ(a, b) {
        var salaryAsANumberA = parseInt(a.salary);
        var salaryAsANumberB = parseInt(b.salary);
        if (salaryAsANumberA > salaryAsANumberB) {
            return -1;
        } else if (salaryAsANumberA < salaryAsANumberB) {
            return 1;
        }
    }
    people.sort(compareSalaryAZ); //sort objects in the array "people"

    //changing the order in table - using the node reference
    for (var i = 0; i < people.length; i++) {
        table.appendChild(people[i].node);
    }
}

salary.addEventListener('click', function () {
    if (salaryAZ === false) {
        sortSalaryAZ();
        salaryAZ = true;
        salary.className = "arrow-up";
        salary.style.cursor = "pointer"; //css is not enough - 'pointer' is removed after click
    } else if (salaryAZ === true) {
        sortSalaryZA()
        salaryAZ = false;
        salary.className = "arrow-down";
        salary.style.cursor = "pointer"; //css is not enough - 'pointer' is removed after click
    }
})

//MODUL: REMOVE rows from the table
var checkbox = document.querySelector("input[name=toBeRemoved]");
var checkboxes = document.querySelectorAll("input[name=toBeRemoved]");
var removeButton = document.querySelector(".employessData__remove");
removeButton.disabled = true;

//Highlight 
function checkboxStyle(e) {
    var rowStyle = e.target.parentNode.parentNode;
    if (e.target.checked === false) {
        rowStyle.style.backgroundColor = "white";
    }
    if (e.target.checked) {
        rowStyle.style.backgroundColor = "#ddd";
    }
}
//Remove button disabled
function countCheckboxes() {
    var count = 0;
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
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
countCheckboxes();
//Delate data
function deleteRow(datatable) {
    var confirmation = confirm('Are you sure?');
    if (confirmation == true) {
        var table = document.getElementById("datatable");
        var rowCount = table.rows.length;
        // var i=1 to start after header
        for (let i = 1; i < rowCount; i++) {
            var row = table.rows[i];
            // index of td contain checkbox is 8
            var chkbox = row.cells[0].getElementsByTagName('input')[0];
            if (chkbox.checked == true && chkbox != null) {
                table.deleteRow(i);
                rowCount--;
                i--;
                removeButton.disabled = true;
                people.splice(i, 1);
            }

        }
    }
}

removeButton.addEventListener('click', deleteRow);
checkboxes.forEach(checkbox => checkbox.addEventListener('click', countCheckboxes));
checkboxes.forEach(checkbox => checkbox.addEventListener('click', checkboxStyle));

//Filter modul
//var buttonFilterReset = document.querySelector(".resetButton");
var buttonFilterDepartment = document.querySelector(".applyFilterButton")
//buttonFilterReset.disabled = true;
var filterPoeple = [];

function filterDepartment(e) {
    e.stopPropagation();
    e.preventDefault();
    var departmentSelection = document.getElementById("departmentSelection");
    var departmentOption = departmentSelection.options[departmentSelection.selectedIndex].value;
    
for (let i = 0; i < people.length; i++) {
    if (people[i].department === departmentOption ) {
        filterPoeple.push(people[i]);
    }

for (let i = 0; i < columnCount; i++) {
    table.appendChild(people[i].node)
}


}
      
console.log(people[0].department)
console.log(filterPoeple)

}
buttonFilterDepartment.addEventListener("click", filterDepartment)
//buttonFilterReset.addEventListener("click", resetFilterDepartment)

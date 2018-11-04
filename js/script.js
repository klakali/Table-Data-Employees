var people = []; // the visible data in the table

//MODUL: ADD AN EMPLOYEE
const add = document.querySelector("input[type=submit]");

function addEmployee(e) {
    e.stopPropagation();
    e.preventDefault();

    const employeeForm = document.querySelector(".addEmployeeForm");

    let row = table.insertRow(-1);
    row.classList.add("singleRow");
    singleRowArray.push(row);
    let addCell = row.insertCell(-1);

    addCell.innerHTML = '<input type="checkbox" name="toBeRemoved">'
    addCell.addEventListener('change', countCheckboxes);
    addCell.addEventListener('change', checkboxStyle);

    let employeeFormArray = [""]; // "" added because below 'for' function starts from 1

    let columnCount = table.rows[0].cells.length;

    for (let i = 1; i < columnCount; i++) {
        let employeeFormValues = document.querySelector(".addEmployeeForm").elements[i].value;
        employeeFormArray.push(employeeFormValues); //form values add to the array
        let addCell = row.insertCell(-1);
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
    people.push(object); //new employee added to "people" - for 'sort' function

    employeeForm.reset(); // Reset form
    return false;
}

add.addEventListener("click", addEmployee);

//MODUL: Surname Sort
const singleRowArray = Array.from(document.querySelectorAll(".singleRow"));
const table = document.getElementById("datatable");
const surname = document.querySelector(".surname");
var surnamesAZ = false; //used on the sort event
var singleRow = document.querySelectorAll(".singleRow");

function peopleToObject() {
    let singleRowArray = Array.from(document.querySelectorAll(".singleRow")); //created to find the children
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
const salary = document.querySelector(".salary");
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
const checkbox = document.querySelector("input[name=toBeRemoved]");
const checkboxes = document.querySelectorAll("input[name=toBeRemoved]");
const removeButton = document.querySelector(".employessData__remove");
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
        // i=1 after header
        for (let i = 1; i < rowCount; i++) {
            var row = table.rows[i];
            var chkbox = row.cells[0].getElementsByTagName('input')[0]; // index of the checbox cell
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
var buttonFilterDepartment = document.querySelector(".applyFilterButton")
const filterPoeple = [];
var buttonFilterActive = true;

function filterDepartment(e) {
    //e.stopPropagation();
    e.preventDefault();
    var singleRow = document.querySelectorAll(".singleRow"); //local let - to include also added employees
    var departmentSelection = document.getElementById("departmentSelection");
    var departmentOption = departmentSelection.options[departmentSelection.selectedIndex].value;
    var rowCount = table.rows.length - 1;
    buttonFilterDepartment.value = 'Reset';

    add.disabled = true;

    if (people.length === 0) {
        add.disabled = false;
        alert("No data")
        return;
    }

    if (buttonFilterActive === true) {
        for (let i = 0; i < people.length; i++) {
            if (people[i].department != departmentOption) {
                buttonFilterActive = false;
                departmentSelection.disabled = true;
                singleRow[i].className += ' hidden';
            }
        }
        return;
    }

    if (buttonFilterActive === false) {
        for (let i = 0; i < people.length; i++) {
            singleRow[i].className = 'singleRow';
            add.disabled = false;
            buttonFilterActive = true;
            buttonFilterDepartment.value = 'Apply';
            departmentSelection.disabled = false;
        }
        return;
    }
}
buttonFilterDepartment.addEventListener("click", filterDepartment)
console.log(people)

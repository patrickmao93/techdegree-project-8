//Never forget your semi-colons!
'use strict';

const body = document.getElementsByTagName("body")[0];
const main = document.getElementById("main");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

let employeeData;
let numberOfEmployees = 0;

class Employee {
    constructor(data) {
        this.id = data.id.value;
        this.firstName = capitalize(data.name.first);
        this.lastName = capitalize(data.name.last);
        this.email = data.email;
        this.phone = data.phone;
        this.picUrl = data.picture.large;
        this.city = capitalize(data.location.city);
        //You used double quotes in a lot of places, but decided to use single quotes here. It's better to be consistent and choose one over the other.
        //Another thing is you chose to use template literals when generating HTML below. Perhaps that would be nice here too?
        this.address = capitalizeEach(data.location.street) + ', ' + capitalize(data.location.state) + ' ' + data.location.postcode;
        this.birthday = formatDate(data.dob.date);
    }
}

//I'm not sure why but your summary comments hurt my eyes

////////////////////////////////////////////////////////////////////////////////////
// Name: Generate Employee Card
// Parameters: data (employee object)
// Return: data (employee object)
// Description: generate employee card HTML base on employee information input
////////////////////////////////////////////////////////////////////////////////////
function generateEmployeeCard(data, index) { 
    const html = `
        <div class="card" data-id="${data.id}" data-index="${index}">
            <div class="card__thumbnail">
                <img src="${data.picUrl}" alt="${data.firstName} ${data.lastName} Profile Thumbnail">
            </div>
            <div class="card__info">
                <h2 class="card__info__name">${data.firstName} ${data.lastName}</h2>
                <span class="card__info__desc">${data.email}</span>
                <span class="card__info__desc">${data.city}</span>
            </div>
        </div>
    `;
    main.innerHTML += html;
    return data;
}

////////////////////////////////////////////////////////////////////////////////////
// Name: Generate Employee Modal
// Parameters: data (employee object)
// Return: undefined
// Description: generate detailed info modal overlay HTML base on employee 
//              information input
////////////////////////////////////////////////////////////////////////////////////

//Technically summary comments are enough, but when your function grows to a point where you think some inline comments are helpful, don't be afraid to add them.
function generateEmployeeModal(data, index) {
    let html = `
        <div class="modal__thumbnail">
            <img src="${data.picUrl}" alt="${data.firstName}">
        </div>
        <div class="modal__info">
            <h2 class="modal__info__name">${data.firstName} ${data.lastName}</h2>
            <span class="modal__info__desc">${data.email}</span>
            <span class="modal__info__desc">${data.city}</span>
            <div class="modal__info__divider"></div>
            <span class="modal__info__desc">${data.phone}</span>
            <span class="modal__info__desc">${data.address}</span>
            <span class="modal__info__desc">Birthday: ${data.birthday}</span>
        </div>
    `;
    const leftIndex = index - 1;
    const rightIndex = index + 1;
    let leftArrowHtml = '';
    let rightArrowHtml = '';

    if (leftIndex !== -1) {
        leftArrowHtml = `
            <nav class="left-arrow" id="leftArrow" data-index="${leftIndex}">
                <svg aria-hidden="true" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path class="left-arrow__path" fill="#404A51" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>
            </nav>
        `;
    }
    
    if (rightIndex !== numberOfEmployees) {
        rightArrowHtml = `
            <nav class="right-arrow" id="rightArrow" data-index="${rightIndex}">
                <svg aria-hidden="true" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path class="right-arrow__path" fill="#404A51" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
            </nav>
        `;
    }

    html = html + leftArrowHtml + rightArrowHtml;

    modal.innerHTML = html;

    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
    addEventListenerToArrow(leftArrow);
    addEventListenerToArrow(rightArrow);
    displayOverlay();
}

////////////////////////////////////////////////////////////////////////////////////
// Name: Add Event Listener To Employees
// Parameters: data (employee object), index (index to identify card in DOM)
// Return: undefined
// Description: bind click event to the employee card at given index position
////////////////////////////////////////////////////////////////////////////////////
function addEventListenerToEmployees(employees) {
    employees.forEach((employee, index) => {
        const employeeCard = document.getElementsByClassName('card')[index];
        employeeCard.addEventListener('click', event => generateEmployeeModal(employee, index));
    });
}

//You have summary comments on most functions but neglect them on a select few. Is there a reason for this?
function addEventListenerToArrow(arrow) {
    if (!arrow) {
        return;
    }
    arrow.addEventListener('click', event => {
        const target = event.currentTarget;
        const index = parseInt(target.getAttribute('data-index'), 10);
        generateEmployeeModal(employeeData[index], index);
    });
}



////////////////////////////////////////////////////////////////////////////////////
// Name: Generate Employee Modal
// Parameters: data (employee object)
// Return: undefined
// Description: generate detailed info modal overlay HTML base on employee 
//              information input
////////////////////////////////////////////////////////////////////////////////////

//A neat thing you can do instead of mapping is already instantiating a new array of Employees, and doing a this.push on the array upon object creation. Saves you from needing to use .map. Not necessary though, but good to know.
function storeEmployeeData(employeeArr) {
    numberOfEmployees = employeeArr.length;
    employeeData = employeeArr.map(employee => new Employee(employee));
    return employeeData;
}

////////////////////////////////////////////////////////////////////////////////////
// Name: Display Overlay
// Parameters: none
// Return: undefined
// Description: show overlay div
////////////////////////////////////////////////////////////////////////////////////
function displayOverlay() {
    overlay.style.display = "block";
}

////////////////////////////////////////////////////////////////////////////////////
// Name: Display Overlay
// Parameters: none
// Return: undefined
// Description: hide overlay div
////////////////////////////////////////////////////////////////////////////////////
function closeOverlay() {
    overlay.style.display = "none";
}

////////////////////////////////////////////////////////////////////////////////////
// Name: Capitalize first letter
// Parameters: string
// Return: string with first letter capitalized
// Description: Capitalizes first letter of a string and returns a copy
////////////////////////////////////////////////////////////////////////////////////
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeEach(str) {
    return str.split(' ').map(word => capitalize(word)).join(' ');
}

////////////////////////////////////////////////////////////////////////////////////
// Name: Date String Formatter
// Parameters: date string
// Return: formatted date string
// Description: formats standardized date input string into MM/DD/YY
////////////////////////////////////////////////////////////////////////////////////
function formatDate(dateStr) {
    const d = new Date(dateStr);
    const config = {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
    };
    return d.toLocaleDateString('en-US', config);
}
//You did good commenting here, I just wish it was like this throughout your entire file.

//fetch fake user info from RandomAPI
fetch('https://randomuser.me/api/?results=12&nat=us') //pull 12 results
    .then(response => response.json()) //parse json
    .then(data => storeEmployeeData(data.results)) //save user info to employeeData global variable
    .then(employees => employees.map((employee, index) => generateEmployeeCard(employee, index))) //for every employee in the array, generate an employee card
    .then(employeeCards => addEventListenerToEmployees(employeeCards))
    .catch(error => console.log(error));

//hide overlay on page load
overlay.style.display = 'none';

//when user clicks on anywhere outside of modal window, close overlay
overlay.addEventListener('click', event => {
    closeOverlay();
});
modal.addEventListener('click', event => event.stopPropagation());
//-------------------------------------------------------------------
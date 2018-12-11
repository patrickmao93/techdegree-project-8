"use strict"
const body = document.getElementsByTagName("body")[0];
const main = document.getElementById("main");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

let numberOfEmployees = 0;

class Employee {
    constructor(data) {
        this.card;
        this.info = {
            firstName: capitalize(data.name.first),
            lastName: capitalize(data.name.last),
            email: data.email,
            phone: data.phone,
            picUrl: data.picture.large,
            city: capitalize(data.location.city),
            address: `${capitalizeEach(data.location.street)}, ${capitalize(data.location.state)} ${data.location.postcode}`,
            birthday: formatDate(data.dob.date)
        }
    }

    generateEmployeeCard(containerDiv, index) {
        const html = `
            <div class="card" id="employee${index}" data-index="${index}">
                <div class="card__thumbnail">
                    <img src="${this.info.picUrl}" alt="${this.info.firstName} ${this.info.lastName} Profile Thumbnail">
                </div>
                <div class="card__info">
                    <h2 class="card__info__name">${this.info.firstName} ${this.info.lastName}</h2>
                    <span class="card__info__desc">${this.info.email}</span>
                    <span class="card__info__desc">${this.info.city}</span>
                </div>
            </div>
        `;
        containerDiv.innerHTML += html;
        this.card = document.getElementById(`employee${index}`);
        this.card.addEventListener('click', event => this.generateEmployeeModal());
    }

    //*********************************************************************************/
    // Name: Generate Employee Modal
    // Parameters: none
    // Return: undefined
    // Description: generate detailed info modal overlay HTML base on employee 
    //              information input
    //*********************************************************************************/
    generateEmployeeModal() {
        //modal html
        let html = `
        <div class="modal__thumbnail">
            <img src="${this.info.picUrl}" alt="${this.info.firstName}">
        </div>
        <div class="modal__info">
            <h2 class="modal__info__name">${this.info.firstName} ${this.info.lastName}</h2>
            <span class="modal__info__desc">${this.info.email}</span>
            <span class="modal__info__desc">${this.info.city}</span>
            <div class="modal__info__divider"></div>
            <span class="modal__info__desc">${this.info.phone}</span>
            <span class="modal__info__desc">${this.info.address}</span>
            <span class="modal__info__desc">Birthday: ${this.info.birthday}</span>
        </div>
        `
        //initiate left and right arrows
        const index = this.card.dataset.index;
        const leftIndex = index - 1;
        const rightIndex = index + 1;
        let leftArrowHtml = '';
        let rightArrowHtml = '';

        //arrow html
        if (leftIndex !== -1) {
            leftArrowHtml = `
                <nav class="left-arrow" id="leftArrow" data-index="${leftIndex}">
                    <svg aria-hidden="true" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path class="left-arrow__path" fill="#404A51" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>
                </nav>
            `
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
        addEventListenerToArrow(leftArrow, this);
        addEventListenerToArrow(rightArrow, this);
        displayOverlay();
    }

    click() {

    }
}

//*********************************************************************************/
// Name: Add Event Listener To Employees
// Parameters: data (employee object), index (index to identify card in DOM)
// Return: undefined
// Description: bind click event to the employee card at given index position
//*********************************************************************************/
function addEventListenerToEmployees(employees) {
    employees.forEach((employee, index) => {
        employee.card.addEventListener('click', event => employee.generateEmployeeModal());
    });
}

//*********************************************************************************/
// Name: Add Event Listener To Arrows
// Parameters: arrow (dom object), employee (dom object)
// Return: undefined
// Description: attach event handler to 
//*********************************************************************************/
function addEventListenerToArrow(arrow, employee) {
    if (!arrow) {
        return; //return directly if arrow can't be found. This targets the first and last case of employee cards which don't have left or right arrow
    }
    arrow.addEventListener('click', event => {
        employee.generateEmployeeModal(); //generate modal for given employee
    });
}

//*********************************************************************************/
// Name: Generate Employee Modal
// Parameters: data (employee object)
// Return: undefined
// Description: generate detailed info modal overlay HTML base on employee 
//              information input
//*********************************************************************************/
function extractEmployeeData(employeeArr) {
    numberOfEmployees = employeeArr.length;
    return employeeArr.map(employee => new Employee(employee));
}

//*********************************************************************************/
// Name: Display Overlay
// Parameters: none
// Return: undefined
// Description: show overlay div
//*********************************************************************************/
function displayOverlay() {
    overlay.style.display = "block";
}

//*********************************************************************************/
// Name: Close Overlay
// Parameters: none
// Return: undefined
// Description: hide overlay div
//*********************************************************************************/
function closeOverlay() {
    overlay.style.display = "none";
}

//*********************************************************************************/
// Name: Capitalize first letter
// Parameters: string
// Return: string with first letter capitalized
// Description: Capitalizes first letter of a string and returns a copy
//*********************************************************************************/
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeEach(str) {
    return str.split(' ').map(word => capitalize(word)).join(' ');
}

//*********************************************************************************/
// Name: Date String Formatter
// Parameters: date string
// Return: formatted date string
// Description: formats standardized date input string into MM/DD/YY
//*********************************************************************************/
function formatDate(dateStr) {
    const d = new Date(dateStr);
    const config = {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
    };
    return d.toLocaleDateString('en-US', config);
}

//fetch fake user info from RandomAPI
fetch('https://randomuser.me/api/?results=12&nat=us') //pull 12 results
    //parse json
    .then(response => response.json()) 
    //process employee data and return a new employee list
    .then(data => extractEmployeeData(data.results)) 
    //for every employee in the list, generate dom element and bind it to employee object
    .then(employees => employees.map((employee, index) => employee.generateEmployeeCard(main, index)))
    .catch(error => console.log(error));

//hide overlay on page load
overlay.style.display = 'none';

//when user clicks on anywhere outside of modal window, close overlay
overlay.addEventListener('click', event => {
    closeOverlay();
});
modal.addEventListener('click', event => event.stopPropagation());
//-------------------------------------------------------------------
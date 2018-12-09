const body = document.getElementsByTagName("body")[0];
const main = document.getElementById("main");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

////////////////////////////////////////////////////////////////////////////////////
// Name: Generate Employee Card
// Parameters: data (employee object)
// Return: data (employee object)
// Description: generate employee card HTML base on employee information input
////////////////////////////////////////////////////////////////////////////////////
function generateEmployeeCard(data) { 
    const html = `
        <div class="card" data-id="${data.id.value}">
            <div class="card__thumbnail">
                <img src="${data.picture.large}" alt="${data.name.first} ${data.name.last} Profile Thumbnail">
            </div>
            <div class="card__info">
                <h2 class="card__info__name">${data.name.first} ${data.name.last}</h2>
                <span class="card__info__desc">${data.email}</span>
                <span class="card__info__desc">${data.location.city}</span>
            </div>
        </div>
    `;
    main.innerHTML += html;
    return data;
}

////////////////////////////////////////////////////////////////////////////////////
// Name: Add Event Listener To Employees
// Parameters: data (employee object), index (index to identify card in DOM)
// Return: undefined
// Description: bind click event to the employee card at given index position
////////////////////////////////////////////////////////////////////////////////////
function addEventListenerToEmployees(data, index) {
    const employeeCard = document.getElementsByClassName('card')[index];
    employeeCard.addEventListener('click', event => generateEmployeeModal(data));
}

////////////////////////////////////////////////////////////////////////////////////
// Name: Generate Employee Modal
// Parameters: data (employee object)
// Return: undefined
// Description: generate detailed info modal overlay HTML base on employee 
//              information input
////////////////////////////////////////////////////////////////////////////////////
function generateEmployeeModal(data) {
    const html = `
        <div class="modal__thumbnail">
            <img src="${data.picture.large}" alt="${data.name.first}">
        </div>
        <div class="modal__info">
            <h2 class="modal__info__name">${data.name.first} ${data.name.last}</h2>
            <span class="modal__info__desc">${data.email}</span>
            <span class="modal__info__desc">${data.location.city}</span>
            <div class="modal__info__divider"></div>
            <span class="modal__info__desc">${data.phone}</span>
            <span class="modal__info__desc">${data.location.street}</span>
            <span class="modal__info__desc">${data.dob.date}</span>
        </div>
    `;
    modal.innerHTML = html;
    displayOverlay();
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

//fetch fake user info from RandomAPI
fetch('https://randomuser.me/api/?results=12&nat=au') //pull 12 results
    .then(response => response.json()) //parse json
    .then(data => data.results) //data.results contains user entries
    .then(employees => employees.map(employee => generateEmployeeCard(employee))) //for every employee in the array, generate an employee card
    .then(employees => employees.forEach((employee, index) => addEventListenerToEmployees(employee, index))) //
    .catch(error => console.log(error));

//hide overlay on page load
overlay.style.display = 'none';

//when user clicks on anywhere outside of modal window, close overlay
overlay.addEventListener('click', event => { 
    closeOverlay();
});
modal.addEventListener('click', event => event.stopPropagation());
//-------------------------------------------------------------------
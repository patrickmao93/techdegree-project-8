const body = document.getElementsByTagName("body")[0];
const main = document.getElementById("main");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

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

function addEventListenerToEmployees(data, index) {
    const employeeCard = document.getElementsByClassName('card')[index];
    employeeCard.addEventListener('click', event => generateEmployeeModal(data));
}

function generateEmployeeModal(data) {
    const html = `
        <div class="modal__thumbnail">
            <img src="${data.picture.large}" alt="${data.name.first}">
        </div>
        <div class="modal__info">
            <div class="modal__info__top">
                <h2>${data.name.first} ${data.name.last}</h2>
                <span>${data.email}</span>
                <span>${data.location.city}</span>
            </div>
            <div class="modal__info__bottom">
                <span>${data.phone}</span>
                <span>${data.location.street}</span>
                <span>${data.dob.date}</span>
            </div>
        </div>
    `;
    modal.innerHTML = html;
    displayOverlay();
}

function displayOverlay() {
    overlay.style.display = "block";
    body.classList.add('noscroll');
}

function closeOverlay() {
    overlay.style.display = "none";
    body.classList.remove('noscroll');
}


fetch('https://randomuser.me/api/?results=12&nat=au')
    .then(response => response.json())
    .then(data => data.results)
    .then(employees => employees.map(employee => generateEmployeeCard(employee)))
    .then(employees => employees.forEach((employee, index) => addEventListenerToEmployees(employee, index)))
    .catch(error => console.log(error));

overlay.style.display = 'none';

overlay.addEventListener('click', event => closeOverlay());
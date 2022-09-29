if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js');
}else{
    console.log('No soporta Service Worker tu navegador');
}


let page = 1;
let total_pages = 0;

const tblPeople = document.querySelector('#tblPeople');
const btnNext = document.querySelector('#btnNext');
const btnPrevius = document.querySelector('#btnPrevius');
const txtPaginator = document.querySelector('#txtPaginator');

const inEmail = document.querySelector('#inEmail');
const inFirst_name = document.querySelector('#inFirst_name');
const inLast_name = document.querySelector('#inLast_name');
const btnSave = document.querySelector('#btnSave');
const btnClose = document.querySelector('#btnClose');

document.addEventListener('DOMContentLoaded', () => {
    requestPetition();
    showPaginatorText();
});

function showPaginatorText() {
    txtPaginator.innerHTML = page;
}

function fillDataTable(data) {
    tblPeople.innerHTML = '';
    data.forEach((e) => {
        tblPeople.innerHTML += ` 
        <tr>
            <th scope="row">${e.id}</th>
            <td>${e.email}</td>
            <td>${e.first_name}</td>
            <td>${e.last_name}</td>
            <td><img src="${e.avatar}"/></td>
        </tr>`;
    });
}

function requestPetition(c_page = 1) {
    fetch(`https://reqres.in/api/users?page=${c_page}`)
        .then((data) => data.json())
        .then((data) => {
            total_pages = data.total_pages;
            fillDataTable(data.data);
        })
        .catch((err) => console.error(err));
}

btnSave.addEventListener('click', () => {
    if (validData()) {
        const model = {
            email: inEmail.value,
            first_name: inFirst_name.value,
            last_name: inLast_name.value,
        };
        fetch('https://reqres.in/api/users', {
            method: 'POST',
            body: JSON.stringify(model),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((data) => data.json())
            .then((data) => {
                inEmail.value = '';
                inFirst_name.value = '';
                inLast_name.value = '';
                btnClose.click();
                showAlert('success', 'Empleado creado correctamente');
                console.log(data);
            })
            .catch((err) => console.error(err));
    }
});

function validData() {
    if (
        inEmail.value === '' ||
        inFirst_name.value === '' ||
        inLast_name.value === ''
    ) {
        showAlert('error', 'Todos los campos son obligatorios');
        return false;
    }
    return true;
}

function showAlert(icon, title) {
    Swal.fire({
        position: 'top-end',
        icon,
        title,
        showConfirmButton: false,
        timer: 2000,
    });
}

btnPrevius.addEventListener('click', () => {
    if (page > 1) {
        page--;
        requestPetition(page);
        showPaginatorText();
    } else showAlert('info', 'No hay mas registros');
});

btnNext.addEventListener('click', () => {
    if (page < total_pages) {
        page++;
        requestPetition(page);
        showPaginatorText();
    } else showAlert('info', 'No hay mas registros');
});

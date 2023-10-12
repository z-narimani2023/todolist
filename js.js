const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const inputInvalid = document.getElementById('input-invalid')
const itemList = document.getElementById('item-list')
const btnClear = document.getElementById('bt-clear')
const Filter = document.getElementById('filter')
const btnAdd = document.getElementById('btn-add')
let Edit = false;

function savestorage() {
    const itemsFromStorage = itemsaddToLocal();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    CheckUI();
}

function additem(e) {
    e.preventDefault();
    const Item = itemInput.value;

    if (Item == '') {
        inputInvalid.innerHTML = 'Try again';
        return;
    } else {
        inputInvalid.innerHTML = '';
    }
    if (Edit) {
        const editeditem = itemList.querySelector('update-item');
        removeFromStorage(editeditem.textContent);
        editeditem.remove();
        btnAdd.innerHTML = '<i class="bi bi-plus"></i> Add item';
        btnAdd.classList.replace('btn-primary', 'btn-dark');
        Edit = false;
    }

    addItemToDOM(Item);
    addItemToStorage(Item);

    itemInput.value = '';
    CheckUI();

}

function addItemToDOM(item) {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.textContent = item;

    const icon = document.createElement('i');
    icon.className = 'bi bi-x fs-5 text-danger';
    li.appendChild(icon);

    itemList.appendChild(li);
}

function addItemToStorage(item) {
    const itemsFromStorage = itemsaddToLocal();

    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function itemsaddToLocal() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function clearitem(e) {
    if (e.target.classList.contains('bi-x')) {
        e.target.parentElement.remove();
        removeFromStorage(e.target.parentElement.textContent);
        CheckUI();
    } else {

        SetItemToEdit(e.target);
    }
}

function SetItemToEdit(item) {
    Edit = true;
    itemList.querySelectorAll('li').forEach(item => item.classList.remove('update-item'));
    item.classList.add('update-item');
    itemInput.value = item.textContent;
    btnAdd.innerHTML = '<i class="bi bi-pencil-fill"></i> Edit item';
    btnAdd.classList.replace('btn-dark', 'btn-primary');
}

function clearall(e) {

    itemList.innerHTML = '';
    localStorage.removeItem('items');
    CheckUI();
}

function removeFromStorage(item) {
    let itemsFromStorage = itemsaddToLocal();

    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function CheckUI() {
    const x = itemList.querySelectorAll('li');
    if (x.length != 0) {
        btnClear.style.display = 'block';
        Filter.style.display = 'block';
    } else {
        btnClear.style.display = 'none';
        Filter.style.display = 'none';
    }
}

function found(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }

    });
}

itemForm.addEventListener('submit', additem);
itemList.addEventListener('click', clearitem);
btnClear.addEventListener('click', clearall);
Filter.addEventListener('input', found);
document.addEventListener('DOMContentLoaded', savestorage);
CheckUI();
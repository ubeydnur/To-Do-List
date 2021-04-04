// UI vars
const formDom = document.querySelector('#addForm');
const listDom = document.querySelector('#taskList');
const alertDom = document.querySelector('#alert');
const deleteAllDom = document.querySelector('#deleteAll');

let items;

const alert = `
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
`

//load items
loadItems();

//call event listeners
eventListeners();

//event listeners
function eventListeners() {
    //submit event
    formDom.addEventListener('submit', addNewItem)

    //delete an item
    listDom.addEventListener('click', deleteItem)

    //delete all items
    deleteAllDom.addEventListener('click', deleteAllItems)
}

function loadItems() {

    items = getItemsFromLS();

    items.forEach(function(item) {
        createItem(item)
    })
}

//get items from Local Storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items
}

//set item to Local Storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items))
}

//delete item from local storage
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function(item, index) {
        if (item === text) {
            items.splice(index, 1)
        }
    })
    localStorage.setItem('items', JSON.stringify(items))
}

function createItem(text) {
    //create li
    const li = document.createElement('li')
    li.classList.add('list-group-item')

    //create a
    const a = document.createElement('a')
    a.classList.add('delete-item', 'float-right')
    a.setAttribute('href', '#')
    a.innerHTML = `<i class="fas fa-times"></i>`

    //add a to li
    li.appendChild(a);

    //add li to ul
    listDom.appendChild(li)

    //add input value to task list
    li.appendChild(document.createTextNode(text))
}

//add new item function
function addNewItem(e) {

    //create item
    createItem(input.value);

    //save to Local Storage
    setItemToLS(input.value)

    if (input.value === '') {
        // alert message
        alertDom.innerHTML = alert
    }

    //clear input
    input.value = ""

    e.preventDefault();
}

//delete an item function
function deleteItem(e) {
    if (e.target.className == 'fas fa-times') {
        //important!!keşfetmem biraz zaman aldı
        e.target.parentElement.parentElement.remove()

        //delete item from local storage
        deleteItemFromLS(e.target.parentElement.parentElement.textContent)
    }
    e.preventDefault()
}

//delete all items function
function deleteAllItems(e) {
    if (confirm("Are you sure?")) {
        listDom.innerHTML = ""
    }
    localStorage.clear()
    e.preventDefault()
}
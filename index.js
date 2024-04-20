import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-521d1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listContainer = document.getElementById("list-container")

renderItems()

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInput(inputFieldEl)
})

document.addEventListener('click', (e)=>{
    let id = e.target.dataset.item
    if(id){
        let locationOfItem = ref(database, `shoppingList/${id}`)
        remove(locationOfItem)
    }
})

function renderItems(){
    onValue(shoppingListInDB, function(snapshot){
        if (snapshot.exists()){
            clearList()
            let arrayEntries = Object.entries(snapshot.val())
            arrayEntries.forEach(item => appendHTML(listContainer, item[1], item[0]))
        }else{
            listContainer.innerText = 'No items here... yet'
        }
    })
}

function clearList(){
    listContainer.innerHTML = ''
}

function clearInput(field){
    field.value = ''
}

function appendHTML(field, name, key){
    field.innerHTML += `<button data-item='${key}' class='groceries'>${name}</button>` 
}
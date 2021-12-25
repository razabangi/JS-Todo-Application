const firebaseConfig = {
apiKey: "AIzaSyC2WAdkqFwslc52I_f2eqoL85Gc2j6SF3s",
authDomain: "raza-todo.firebaseapp.com",
databaseURL: "https://raza-todo-default-rtdb.firebaseio.com",
projectId: "raza-todo",
storageBucket: "raza-todo.appspot.com",
messagingSenderId: "921254429095",
appId: "1:921254429095:web:425ed377113f50cde47682",
measurementId: "G-R4X8B6X64D"
};
const app = firebase.initializeApp(firebaseConfig);
let database = app.database();

let todoItem = "todoItem";
let showList = "showList";
let errorShow = "error";

function getId(data){
    return document.getElementById(data);
}

function create(){
    let item = getId(todoItem);
    let clearAllBtn = getId('clearAll');
    let error = getId(errorShow);

    if (item.value != "") {
        if (item.value.length <= 3) {
            error.setAttribute("class","error");
            error.innerHTML = `Data must be greater than 3 characters.`;
        } else {
            error.innerHTML = ``;
            clearAllBtn.classList.remove('d-none');
            clearAllBtn.classList.add('d-block');            
            var key = database.ref("/").push().key
            var todoObj = {
                key : key,
                todo : item.value
            }
            database.ref("todoApp").child(key).set(todoObj)
            item.value = "";
        }
        
    } else {
        error.setAttribute("class","error");
        error.innerHTML = `Enter a todo task`;
    }
}

database.ref("todoApp").on("child_added" , function(data){
    if (data.val().todo != "") {
        let clearAllBtn = getId('clearAll');
        clearAllBtn.classList.remove('d-none');
        clearAllBtn.classList.add('d-block');  
    }

    let todoList = getId(showList);
    let li = document.createElement("li");
    let span = document.createElement("span");
    let button = document.createElement("button");
    let i = document.createElement("i");
    li.appendChild(span);
    li.appendChild(button);
    button.appendChild(i);
    span.setAttribute("contentEditable",true);
    span.setAttribute("id" , data.val().key);
    span.setAttribute("onblur","edit(this)");
    span.setAttribute("onclick","enter(this)");
    button.setAttribute("contentEditable",false);
    li.setAttribute("onkeypress","return (this.innerText.length < 30)");
    li.setAttribute("onkeyup","return (this.innerText.length < 30)");
    button.setAttribute("onclick","deleteItem(this)");
    button.setAttribute("id" , data.val().key);
    i.setAttribute("class","fas fa-trash-alt");
    todoList.appendChild(li);
    span.innerHTML = data.val().todo;
});

function clearAll(e){
    let list = getId(showList);
    error.innerHTML = ``;
    list.innerHTML = "";
    database.ref("/todoApp").remove();
    e.classList.remove('d-block');
    e.classList.add('d-none');
}

function edit(e){
    e.innerHTML = e.innerHTML;
    database.ref("todoApp").child(e.id).update({
        todo : e.innerHTML
    })
}

function deleteItem(e){
    error.innerHTML = ``;
    let seconds = 500/1000;
    e.parentNode.style.transition = `opacity ${seconds}s ease`;
    e.parentNode.style.opacity = 0;
    setTimeout(function() {
        e.parentNode.remove(e);
        database.ref("todoApp").child(e.id).remove();
    }, 500);
}

function enter(e){
    e.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
    });   
}

let input = getId(todoItem);
let createBtn = getId("createTodo");

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    createBtn.click();
  }
});
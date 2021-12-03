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
            let todoList = getId(showList);
            clearAllBtn.classList.remove('d-none');
            clearAllBtn.classList.add('d-block');
            let li = document.createElement("li");
            let span = document.createElement("span");
            let button = document.createElement("button");
            let i = document.createElement("i");
            li.appendChild(span);
            li.appendChild(button);
            button.appendChild(i);
            span.setAttribute("contentEditable",true);
            span.setAttribute("onblur","edit(this)");
            span.setAttribute("onclick","enter(this)");
            button.setAttribute("contentEditable",false);
            li.setAttribute("onkeypress","return (this.innerText.length < 30)");
            li.setAttribute("onkeyup","return (this.innerText.length < 30)");
            button.setAttribute("onclick","deleteItem(this)");
            i.setAttribute("class","fas fa-trash-alt");
            todoList.appendChild(li);
            span.innerHTML = item.value;

            item.value = "";
        }
        
    } else {
        error.setAttribute("class","error");
        error.innerHTML = `Enter a todo task`;
    }
}

function clearAll(e){
    let list = getId(showList);
    error.innerHTML = ``;
    list.innerHTML = "";
    e.classList.remove('d-block');
    e.classList.add('d-none');
}

function edit(e){
    e.innerHTML = e.innerHTML;
}

function deleteItem(e){
    error.innerHTML = ``;
    let seconds = 500/1000;
    e.parentNode.style.transition = `opacity ${seconds}s ease`;
    e.parentNode.style.opacity = 0;
    setTimeout(function() {
        e.parentNode.remove(e);
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
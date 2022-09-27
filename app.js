//Selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")


//EventListeners
document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click", addTodo) ;
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click",filterTodo);
//Functions

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo= document.createElement("li");
    newTodo.innerText= todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value)
    const completedButton=document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    const trashButton=document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = ""

}

function deletecheck(e){
    const item = e.target
    //delete todo
    if (item.classList[0]=="trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        })
    }
    //check  todo
    if (item.classList[0] == "completed-btn") {
        const todo = item.parentElement
        todo.classList.toggle("checked")
      
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
            todo.style.display = "flex";
            break;
            case "completed":
                if(todo.classList.contains("checked")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
            break;      
            case "uncompleted":
              if(todo.classList.contains("checked")){
                todo.style.display="none";
              }  else {
                todo.style.display="flex";
              }
        }
    }
    )    
}

//localstorage function
function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos=[];
    }else {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos=[];
    }else {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo=> {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        const newTodo= document.createElement("li");
        newTodo.innerText= todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
    
        const completedButton=document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);
    
        const trashButton=document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv);
    } )
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null){
        todos=[];
    }else {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex= todo.children[0].innerText; 
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos))
}

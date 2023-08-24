const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const clearButton = document.getElementById("clearButton");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
    todos.forEach(todo => {
        addTodo(todo);
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
})

function addTodo(todo){
    let todoText = input.value;
    const buttonText = "x";
    if(todo){
        todoText = todo.text;
    }
    if(todoText){
        const todoEl = document.createElement("li");
        const closeButtonEl = document.createElement("div");
        if (todo && todo.completed){
            todoEl.classList.add("completed");
        }
        todoEl.innerText = todoText;
        closeButtonEl.innerText = buttonText;

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
            updateLocalStorage();
        })
        closeButtonEl.addEventListener("click", () => {
            todoEl.remove();
            closeButtonEl.remove();
            updateLocalStorage();
        })
        clearButton.addEventListener("click", () => {
            localStorage.clear();
            const allTodos = document.querySelectorAll("li");
            allTodos.forEach(() => {
                todoEl.remove();
                closeButtonEl.remove();
            })
        })
        todosUL.appendChild(todoEl);
        todosUL.appendChild(closeButtonEl);
        input.value = "";
        updateLocalStorage();
    }
}

function updateLocalStorage(){
    const todosEl = document.querySelectorAll("li");
    const todos = [];
    todosEl.forEach(todosEl => {
        todos.push({
            text: todosEl.innerText,
            completed: todosEl.classList.contains("completed"),
        })
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}
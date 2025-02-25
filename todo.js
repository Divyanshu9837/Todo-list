const todoForm=document.querySelector("form");
const  todoInput=document.getElementById("todo-input");
const todoListUL=document.getElementById("todo-list");


let allTodos=getTodos();
updateTodoList();



todoForm.addEventListener("submit",function(e){
    e.preventDefault();
    addTodo();
   
    
})

function addTodo(){
    const todoText=todoInput.value.trim();
    
       if (todoText.length > 0){
    
        const todoObject={
            text:todoText,
            completed:false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value= "";
       }
}
function updateTodoList(){
    todoListUL.innerHTML= "";
    allTodos.forEach((todo,todoIndex)=>{
        todoItem=createTodoItem(todo,todoIndex);
        todoListUL.append(todoItem); 
    })
}


function createTodoItem(todo,todoIndex){
    const todoId="todo-"+todoIndex;
    const todoLI=document.createElement("li");
    const todoText=todo.text;
    todoLI.className= "todo";
    todoLI.innerHTML=`<input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg  fill="transparent" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path>
                        </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                   ${todoText}
                </label>
                <button class="delete-button">
                    <svg  fill="var(--secondary-color)"xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                        </svg>
                    </button>`

const  deleteButton=todoLI.querySelector(".delete-button");
deleteButton.addEventListener("click",()=>{
    deleteTodoItem(todoIndex);
})
const checkbox=todoLI.querySelector("input");
checkbox.addEventListener("change",()=>{
    allTodos[todoIndex].completed= checkbox.checked;
    saveTodos();
})
checkbox.checked= todo.completed;
return todoLI;
}

function deleteTodoItem(todoIndex){
    allTodos=allTodos.filter((_, i)=> i !== todoIndex); 
    saveTodos();
    updateTodoList();

}



function saveTodos(){
    const todosJson=JSON.stringify(allTodos);
    localStorage.setItem("todos",todosJson);
}
function getTodos(){
    const todos=localStorage.getItem("todos")||"[]";
    return JSON.parse(todos);
}
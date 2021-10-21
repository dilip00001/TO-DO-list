const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo');

// event listeners

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);
filterOption.addEventListener('click', filterTodo);
// addtodo is a function we are going to create

function addTodo(event){
// preventDefault is used to jot ot refresh the page from submitting
    event.preventDefault();

    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to localstorage
    saveLocalTodos(todoInput.value);
    //complete button

    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML='<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //append the todoDiv to todoList

    todoList.appendChild(todoDiv);

    // to remove the previous input in the todoInput

    todoInput.value='';
}

function deleteAndCheck(event){
    const item=event.target;

    //delete todo
    if (item.classList[0]==="delete-btn"){
        const todo=item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodo(todo);   
        todo.addEventListener('transitionend',function(){
            
          todo.remove();
        })
    }
    //completed todo
    if (item.classList[0]==="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }

    
}


function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                } else {
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                 if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                } else {
                    todo.style.display="none";
                }
                break;


                           
        }
    });
}

function saveLocalTodos(todo){
   // if part is to check if there is anything ,if it is empty then create a array
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{//else part is if there is anything okay 
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    // this part is for if we add any new item then it pushes to todo array to store  
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{//else part is if there is anything okay 
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo=document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        
        
        //complete button

        const completedButton=document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //delete button
        const deleteButton=document.createElement('button');
        deleteButton.innerHTML='<i class="fas fa-trash"></i>'
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        //append the todoDiv to todoList

        todoList.appendChild(todoDiv);
            
        });
}

function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{//else part is if there is anything okay 
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);

    localStorage.setItem('todos',JSON.stringify(todos));
}



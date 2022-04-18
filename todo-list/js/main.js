
//variables to easily retype elements
const todoInput = document.getElementById('todoInput')
const todoList = document.getElementById('todoList')
const removeAllBtn = document.getElementById('removeAll')
const clearBtn = document.getElementById('clearCompleted')
const tasksLeft = document.getElementById('tasksLeft')

//event listeners
document.getElementById('submitBtn').addEventListener('click', addTodoList)
todoList.addEventListener('click', removeInput)
todoList.addEventListener('click', completeTask)
todoList.addEventListener('click', addMessage)
removeAllBtn.addEventListener('click', removeAll)
clearBtn.addEventListener('click', clearCompleted)

//functions
function addTodoList(e){
    e.preventDefault()
    if (todoInput.value === ''){
        return
    }
    const li = document.createElement('li')
    li.innerText = todoInput.value

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'x'
    removeBtn.classList.add('remove') 
    li.appendChild(removeBtn)

    const msg = document.createElement('span')
    msg.textContent = compliment()
    li.append(msg)
    
    todoList.appendChild(li) 
    todoInput.value = ''   
    countTasks()
}

function removeInput(e){
    if (e.target.classList.contains('remove')){         
        e.target.parentNode.remove()  
        countTasks()
    }
}

function completeTask(e){
    e.target.classList.toggle('crossOut')
    countTasks()
}
function addMessage(e){
    // e.target.children[1].classList.toggle('crossOut')
    e.target.children[1].classList.toggle('message')
    // console.log(e.target.children[1])
}

function compliment(){
    let randomNumber = Math.random()
    response = 'Good job!'
    if (randomNumber < 0.2){
        response = 'You\'re killing it!'
        } else if (randomNumber < 0.4){
            response = 'Pat yourself on the back!'
        } else if (randomNumber < 0.6){
            response = 'Nice!'
        } else if (randomNumber < 0.8){
            response = 'Amazing job!'
        }  
    return response
}

function countTasks(){
    let tasks = 0
    document.querySelectorAll('li').forEach(li => tasks++)
    document.querySelectorAll('.crossOut').forEach(element => tasks--)
    tasksLeft.innerText = `You have ${tasks} tasks left to complete.`
}

function removeAll(){
    document.querySelectorAll('li').forEach(li => li.remove()) 
    countTasks()
}

function clearCompleted(){
    document.querySelectorAll('.crossOut').forEach(element => element.remove())

}

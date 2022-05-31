
// //variables to easily retype elements
// const todoInput = document.getElementById('todoInput')
// const todoList = document.getElementById('todoList')
// const removeAllBtn = document.getElementById('removeAll')
// const clearBtn = document.getElementById('clearCompleted')
// const tasksLeft = document.getElementById('tasksLeft')

// const { response } = require("express")

// //event listeners
// document.getElementById('submitBtn').addEventListener('click', addTodoList)
// todoList.addEventListener('click', removeInput)
// removeAllBtn.addEventListener('click', removeAll)
// clearBtn.addEventListener('click', clearCompleted)

// //functions
// function addTodoList(e){
//     e.preventDefault()
//     if (todoInput.value === ''){
//         return
//     }
//     const li = document.createElement('li')
    
//     const item = document.createElement('span')
//     item.innerText = todoInput.value
//     li.appendChild(item)

//     const removeBtn = document.createElement('button')
//     removeBtn.textContent = 'x'
//     removeBtn.classList.add('remove') 
//     li.appendChild(removeBtn)

//     const msg = document.createElement('span')
//     msg.textContent = compliment()
//     msg.classList.add('hidden')
//     li.append(msg)
    
//     todoList.appendChild(li) 
//     todoInput.value = ''   

//     item.addEventListener('click', completeTask)
//     countTasks()
// }

// function removeInput(e){
//     if (e.target.classList.contains('remove')){         
//         e.target.parentNode.remove()  
//         countTasks()
//     }
// }

// function completeTask(e){
//     e.target.classList.toggle('crossOut')
//     e.target.parentNode.children[2].classList.toggle('hidden')
//     countTasks()
// }

// function compliment(){
//     let randomNumber = Math.random()
//     response = 'Good job!'
//     if (randomNumber < 0.2){
//         response = 'You\'re killing it!'
//         } else if (randomNumber < 0.4){
//             response = 'Pat yourself on the back!'
//         } else if (randomNumber < 0.6){
//             response = 'Nice!'
//         } else if (randomNumber < 0.8){
//             response = 'Amazing job!'
//         }  
//     return response
// }

// function countTasks(){
//     let tasks = 0
//     document.querySelectorAll('li').forEach(li => tasks++)
//     document.querySelectorAll('.crossOut').forEach(element => tasks--)
//     tasksLeft.innerText = `You have ${tasks} tasks left to complete.`
// }

// function removeAll(){
//     document.querySelectorAll('li').forEach(li => li.remove()) 
//     countTasks()
// }

// function clearCompleted(){
//     document.querySelectorAll('.crossOut').forEach(span => span.parentNode.remove())
// }

var check = document.getElementsByClassName('fa-check')
var trash = document.getElementsByClassName('fa-trash')
var removeAll = document.getElementById('removeAll')
var clearCompleted = document.getElementById('clearCompleted')

Array.from(check).forEach(function(element) {
    element.addEventListener('click', function(){
        const check = this.parentNode.parentNode.childNodes[1].classList.toggle('crossOut')
        const _id = this.parentNode.parentNode.childNodes[1].id
        fetch('tasks', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'check': check,
                '_id': _id
            })
        })
        .then(response => {
            if  (response.ok) return response.json()
        })
        .then(data => {
            window.location.reload(true)
        })
    })
})

Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
        const _id = this.parentNode.parentNode.childNodes[1].id
        fetch('tasks', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': _id
            })
        })
        .then(function (response) {
            window.location.reload()
        })
    })
})

removeAll.addEventListener('click', function(){
    fetch('tasksAll', {
        method: 'delete'
    })
    .then(function (response) {
        window.location.reload()
    })
})

clearCompleted.addEventListener('click', function(){
    fetch('tasksCompleted', {
        method: 'delete',
    })
    .then(function (response) {
        window.location.reload()
    })
})


// add a task count

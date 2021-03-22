const form = document.getElementById("form1");
const input = document.getElementById("task");
const list = document.querySelector("ul");
let tasks = []

function initTaskCreated(){
  tasks = []
   let listTasks = localStorage.getItem("Tasks")
   listTasks = JSON.parse(listTasks);
    for(let i = 0; i < listTasks.length; i++){
        addTask(listTasks[i]);
    }
    countPendingTask();
}
function addTask (newTask){
    tasks.push(newTask);
    localStorage.setItem("Tasks",JSON.stringify(tasks));
    const task = document.createElement("li");
    task.addEventListener("click", deleteTask);
    task.innerText = newTask;
    list.append(task);
    countPendingTask();
}
form.addEventListener("submit", (Event) => {
    Event.preventDefault();
    if (input.value !== ""){
       addTask(input.value);
       clearInput();
    }else if(input.value == ""){
        alert("Debes agregar una tarea");
    }
});
function clearInput(){
    input.value = "";
    input.focus();
 }
 function deleteTask (event){
   let indexToDelete = 0
   for(let i = 0;i<list.children.length;i++){
     if(event.srcElement == list.children[i]){
       indexToDelete = i
     }
   }
   tasks.splice(indexToDelete,1);
   localStorage.setItem("Tasks",JSON.stringify(tasks));
   list.innerHTML = ""
   initTaskCreated()
 }

 function countPendingTask (){
    document.getElementById("numTask").innerHTML = tasks.length;
 }


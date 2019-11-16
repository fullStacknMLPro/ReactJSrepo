// Define UI Vars
const form=document.querySelector("#task-form");
const taskInput=document.querySelector("#task");
const filter=document.querySelector("#filter");
const taskList=document.querySelector(".collection");
const clearBtn=document.querySelector('.clear-tasks');


// Load all event listeners
loadAllEventListeners();

// All event listener
function loadAllEventListeners(){
  // DOM Load Event
  document.addEventListener("DOMContentLoaded",getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove ask event
  taskList.addEventListener('click',removeTask);
  // Clear tasks event
  clearBtn.addEventListener('click',clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup',filterTasks);
}

// Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // Create li element
    const li=document.createElement('li');
    // Add class
    li.className='collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create link element
    const link=document.createElement('a');
    // Add class
    link.className="delete-item secondary-content";
    // Create html icon
    link.innerHTML='<i class="fa fa-remove"></i>';
    // Append it to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

  });

}

// Add task
function addTask(e){
  if(taskInput.value===''){
    alert("Buddy, you've forgotted to add a list item");
  }

  // Create li element
  const li=document.createElement('li');
  // Add class
  li.className='collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create link element
  const link=document.createElement('a');
  // Add class
  link.className="delete-item secondary-content";
  // Create html icon
  link.innerHTML='<i class="fa fa-remove"></i>';
  // Append it to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeInLocalStorage(taskInput.value);


  // Clear the task bar
  taskInput.value="";

  e.preventDefault();
}
// Store in LS
function storeInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));

}

// Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();

    // Remove from LS
    removeFromLocalStorage(e.target.parentElement.parentElement);
  }
}
// Remove from LS
function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){
    if(taskItem.textContent===task){
      tasks.splice(index,1);
    }    
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Cleart tasks
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Tasks
  clearTasksFromLocalStorage();
}
// Clear tasks
function clearTasksFromLocalStorage(){
  localStorage.clear();
}
// Filter tasks
function filterTasks(e){
  const text=e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1){
      task.style.display="block";
    }else{
      task.style.display="none";
    }
  });

}
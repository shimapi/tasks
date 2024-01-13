let tasks = [];
let newTaskForm;
const priorityLevels = {
  'p1': 'A - Urgente',
  'p2': 'B - Importante',
  'p3': 'C - Deseable'
}

function greeting() {
  const nameOwner = document.querySelector('#owner-name');
  const helloUsername = document.querySelector('.username');
  const username = localStorage.getItem('username') || '';

  //// FALTA VALIDAR : Y PONER EL NOMBRE EN MAYUSCULA (CON CSS TA BIEN)
  nameOwner.addEventListener('change', e => {
    localStorage.setItem('username', e.target.value)
    helloUsername.textContent = e.target.value + ": ";
  })
  nameOwner.value = username;
  helloUsername.textContent = username + ": ";

}

function taskPriority() {
  const priorityOptions = document.getElementsByName('priority');
  let selectedPriority = '';

  for (let i = 0; i < priorityOptions.length; i++) {
    if (priorityOptions[i].checked) {
      selectedPriority = priorityOptions[i].id;
      break;
    }
  }

  console.log('Selected Priority:', selectedPriority);
  return selectedPriority;
}

function createNewTask(e) {
  e.preventDefault();
  const taskName = newTaskForm.elements['task-name'].value;
  const taskPriorityID = taskPriority();

  console.log('Task Name:', taskName);
  console.log('Task Priority:', taskPriorityID);

  //creating tasks array
  const task = {
    name: taskName,
    priority: taskPriorityID,
    done: false,
    createdAt: new Date().getTime()
  }
  //adding a task to the array
  tasks.push(task);

  //saving the array localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  e.target.reset();

  displayTasks()
}

function displayTasks() {
  const tasksList = document.querySelector('#task-template').content;
  let tasksContainer = document.querySelector('.tasks-container');
  //const taskPriorityValue = document.querySelector('.task-priority');


  tasksContainer.innerHTML = '';
  // verify if there are tasks in array 'tasks' (global variable)
  if (tasks.length > 0) {

    tasks.forEach(t => {
      const task = tasksList.querySelector('.task').cloneNode(true);
      const taskName = t.name;
      const taskDone = t.done; // true/false
      const taskCheckbox = task.querySelector('.task-done');
      const taskPriorityLevel = t.priority;

      task.querySelector('.task-name').value = taskName;
      task.querySelector('.task-priority').textContent = taskPriorityLevel;
      task.querySelector('.task-priority').classList.add(taskPriorityLevel);
      console.log(taskPriorityLevel)

      if (taskDone) {
        taskCheckbox.classList.add('done');
        taskCheckbox.checked = true;
        console.log('checked:', taskCheckbox.checked)
        console.log('taskCheckbox:', taskCheckbox)
      }

      taskCheckbox.addEventListener('change', (e) => {
        t.done = e.target.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        if (t.done) {
          taskCheckbox.classList.add('done');
        } else {
          taskCheckbox.classList.remove('done');
        }
      })

      tasksContainer.append(task)
    })

  } else {
    console.log('El array de tareas está vacío.');
  }
}
function taskDone() {

}


window.addEventListener('load', () => {
  tasks = JSON.parse(localStorage.getItem('tasks')) || tasks;

  newTaskForm = document.querySelector('#tasks-form');


  newTaskForm.addEventListener('submit', createNewTask)
  greeting();
  displayTasks()
})
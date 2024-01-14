let tasks = [];
let newTaskForm;
const tasksList = document.querySelector('#task-template').content;
let tasksContainer = document.querySelector('.tasks-container');
const priorityOptions = document.getElementsByName('priority');
const priorityLevels = {
  'p1': '(a) Urgente',
  'p2': '(b) Importante',
  'p3': '(c) Deseable'
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

function taskPriority(priorityOptions) {
  let selectedPriority = '';

  for (let i = 0; i < priorityOptions.length; i++) {
    if (priorityOptions[i].checked) {
      selectedPriority = priorityOptions[i].id;
      break;
    }
  }
  return selectedPriority;
}

//Displays the value of the priority
function displayPriorityName(taskPriorityLevel) {
  let result;
  Object.entries(priorityLevels).forEach(([key, value]) => {
    if (key == taskPriorityLevel) {
      result = value;
    }
  });
  return result;
}
//Displays the value of the priority in form
function taskForm(priorityOptions) {
  const taskPriorityLevel = taskPriority(priorityOptions);
  const taskPriorityName = displayPriorityName(taskPriorityLevel);

  // Actualiza los radios y labels de prioridad
  for (const key in priorityLevels) {
    const label = document.querySelector(`label[for=${key}]`);

    if (key === taskPriorityLevel) {
      label.textContent = taskPriorityName;
    } else {
      label.textContent = priorityLevels[key];
    }
  }
}

function createNewTask(e) {
  e.preventDefault();
  const taskName = newTaskForm.elements['task-name'].value;
  const taskPriorityID = taskPriority(priorityOptions);

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

  appendNewTask(task)
}

function createNewTaskCard(task) {
  const taskCloneNode = tasksList.querySelector('.task').cloneNode(true); //task
  console.log('createNewTaskCard', task.name)
  const taskName = task.name;
  const taskDone = task.done; // boolean
  const taskPriorityLevel = task.priority;
  const taskCheckbox = taskCloneNode.querySelector('.task-done');

  const displayPriorityTask = displayPriorityName(taskPriorityLevel);

  taskCloneNode.querySelector('.task-name').value = taskName;
  taskCloneNode.querySelector('.task-priority').textContent = displayPriorityTask;
  taskCloneNode.querySelector('.task-priority').classList.add(taskPriorityLevel);

  if (taskDone) {
    taskCheckbox.classList.add('done');
    taskCheckbox.checked = true;
  }

  const deleteButton = taskCloneNode.querySelector('.delete');
  if (deleteButton) { // Verifica si el botón de eliminar existe
    deleteButton.addEventListener('click', () => deleteTask(task, taskCloneNode));
  }
  taskCheckbox.addEventListener('change', (e) => {
    task.done = e.target.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    if (task.done) {
      taskCheckbox.classList.add('done');
    } else {
      taskCheckbox.classList.remove('done');
    }
  })
  tasksContainer.append(taskCloneNode);
}

function appendNewTask(task) {
  createNewTaskCard(task);
  console.log('appendNewTask task', task)
  tasksContainer.append(task)
}

function displayTasks(e) {
  // verify if there are tasks in array 'tasks'
  if (tasks.length > 0) {
    tasks.map(t => {
      createNewTaskCard(t);
      console.log('displayTasks')
    })
  } else {
    console.log('El array de tareas está vacío.');
  }
}

function deleteTask(taskToDelete, taskElement) {
  // Elimina la tarea específica del array 'tasks'
  tasks = tasks.filter(task => task !== taskToDelete);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Elimina la tarea del DOM
  taskElement.remove();
}

window.addEventListener('load', () => {
  tasks = JSON.parse(localStorage.getItem('tasks')) || tasks;

  newTaskForm = document.querySelector('#tasks-form');
  newTaskForm.addEventListener('submit', createNewTask)

  greeting();
  taskForm(priorityOptions);
  displayTasks()
})
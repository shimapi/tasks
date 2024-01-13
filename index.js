let tasks = [];
let newTaskForm;
const priorityOptions = document.getElementsByName('priority');

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

const priorityLevels = {
  'p1': 'A - Urgente',
  'p2': 'B - Importante',
  'p3': 'C - Deseable'
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


  /*   console.log('Task Name:', taskName);
    console.log('Task Priority:', taskPriorityID); */

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
  // verify if there are tasks in array 'tasks'
  if (tasks.length > 0) {

    tasks.forEach(t => {
      const task = tasksList.querySelector('.task').cloneNode(true);
      const taskName = t.name;
      const taskDone = t.done; // true/false
      const taskCheckbox = task.querySelector('.task-done');
      const taskPriorityLevel = t.priority;

      const displayPriorityTask = displayPriorityName(taskPriorityLevel);

      task.querySelector('.task-name').value = taskName;
      task.querySelector('.task-priority').textContent = displayPriorityTask;
      task.querySelector('.task-priority').classList.add(taskPriorityLevel);

      if (taskDone) {
        taskCheckbox.classList.add('done');
        taskCheckbox.checked = true;
        /*      console.log('checked:', taskCheckbox.checked)
             console.log('taskCheckbox:', taskCheckbox) */
      }

      const deleteButton = task.querySelector('.delete');
      if (deleteButton) { // Verifica si el botón de eliminar existe
        deleteButton.addEventListener('click', () => deleteTask(t, task));
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
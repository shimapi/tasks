let tasks = [];

function taskPriority() {
  const priorityOptions = document.getElementsByName('priority');
  let selectedPriority = '';

  for (let i = 0; i < priorityOptions.length; i++) {
    if (priorityOptions[i].checked) {
      selectedPriority = priorityOptions[i].value;
      break;
    }
  }

  console.log('Selected Priority:', selectedPriority);
  return selectedPriority;
}


function createNewTask(e) {
  e.preventDefault();
  const taskName = document.querySelector('#task-name').value;
  const taskPriorityValue = taskPriority();

  console.log('Task Name:', taskName);
  console.log('Task Priority:', taskPriorityValue);

  //creating tasks array
  const task = {
    name: taskName,
    priority: taskPriorityValue,
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

window.addEventListener('load', () => {
  tasks = JSON.parse(localStorage.getItem('tasks')) || tasks;
  const nameOwner = document.querySelector('#owner-name');
  const helloUsername = document.querySelector('.username');
  const username = localStorage.getItem('username') || '';
  const newTaskForm = document.querySelector('#tasks-form');

  nameOwner.addEventListener('change', e => {
    localStorage.setItem('username', e.target.value)
    helloUsername.textContent = "de " + e.target.value;
  })
  nameOwner.value = username;
  helloUsername.textContent = "de " + username;

  displayTasks()
})

function displayTasks() {
  const tasksList = document.querySelector('#task-template').content;
  let tasksContainer = document.querySelector('.tasks-container');


  // verify if there are tasks in array 'tasks' (global variable)
  if (tasks.length > 0) {

    tasks.forEach(t => {
      const task = tasksList.querySelector('.task').cloneNode(true);
      const taskName = t.name;
      const taskDone = t.done; // true/false
      const taskCheckbox = task.querySelector('.task-done');

      task.querySelector('.task-name').value = taskName;

      if (taskDone) {
        taskCheckbox.classList.add('done');
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

      tasksContainer.appendChild(task)
    })

  } else {
    console.log('El array de tareas está vacío.');
  }
}
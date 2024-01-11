
function taskPriority() {
  const priority = document.getElementsByName('priority');
  const priorityChecked = document.getElementsByName('priority').checked;
  console.log(priorityChecked)

  for (let i = 0; i < priority.length; i++) {
    console.log('priority[i].value', priority[i].value);
  }
}

function createNewTask(e) {
  e.preventDefault();
  const taskName = document.querySelector('#task-name').value;

  console.log(taskName);

  taskPriority()
}

window.addEventListener('load', () => {
  tasks = JSON.parse(localStorage.getItem('tasks')) || []; //global variable
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

  newTaskForm.addEventListener('submit', e => {
    e.preventDefault();

    //creating tasks array
    const task = {
      name: e.target.elements.task.value,
      priority: e.target.elements.priority.checked,
      done: false,
      createdAt: new Date().getTime()
    }
    //adding a task to the array
    tasks.push(task);

    //saving the array localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    e.target.reset();
  })
})
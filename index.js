
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
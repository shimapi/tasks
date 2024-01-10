//document.write('hola po')
//document.getElementById('test').innerHTML = 'es importante poner el JS después de que se cargue el DOM, sino no funciona la cuestion'
//document.body.innerHTML = ''

const tasksForm = document.tasks_form;
const taskName = document.getElementById('task_name');
const priority = document.getElementsByName('priority');

for (let i = 0; i < priority.length; i++) {
  console.log('priority[i].value', priority[i].value)
}

console.log(taskName)
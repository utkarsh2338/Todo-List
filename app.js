// let btn = document.querySelector('button');
// let ul = document.querySelector('ul');
// let inp = document.querySelector('input');

// btn.addEventListener('click', function() {
//     let li = document.createElement('li');
//     li.innerText = inp.value;
//     let but = document.createElement('button');
//     but.innerText = 'Delete';
//     but.addEventListener('click', function() {
//         ul.removeChild(li);
//         console.log('Item removed:', li.innerText);
//     });
//     li.appendChild(but);
//     ul.appendChild(li);
//     console.log('Item added:', li.innerText);
//     inp.value = "";
//     inp.focus();
//     console.log('Input cleared and focused');
// }); 

// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load saved tasks (or initialize)
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

// Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render the list
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(({ id, text, completed }) => {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    // Checkbox
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.checked = completed;
    chk.addEventListener('change', () => {
      tasks = tasks.map(t =>
        t.id === id ? { ...t, completed: chk.checked } : t
      );
      saveTasks();
      renderTasks();
    });

    // Text
    const span = document.createElement('span');
    span.textContent = text;

    // Delete
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      renderTasks();
    });

    li.append(chk, span, delBtn);
    taskList.appendChild(li);
  });
}

// Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
  taskInput.focus();
}

// Events
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

// Initial
renderTasks();

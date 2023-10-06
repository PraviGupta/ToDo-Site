document.addEventListener('DOMContentLoaded', function() {
  var taskForm = document.getElementById('taskForm');
  var taskInput = document.getElementById('taskInput');
  var categoryInput = document.getElementById('categoryInput');
  var dateInput = document.getElementById('dateInput');
  var priorityInput = document.getElementById('priorityInput');
  var taskList = document.getElementById('taskList');

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var taskText = taskInput.value;
    var categoryValue = categoryInput.value;
    var dateValue = dateInput.value;
    var priorityValue = priorityInput.value;

    if (taskText.trim() !== '' && categoryValue !== '' && dateValue !== '' && priorityValue !== '') {
      var taskItem = createTaskItem(taskText, categoryValue, dateValue, priorityValue);
      taskList.appendChild(taskItem);

      // Reset form inputs
      taskInput.value = '';
      categoryInput.value = '';
      dateInput.value = '';
      priorityInput.value = '';

      // Save tasks to local storage
      saveTasksToLocalStorage();
    }
  });

  taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteButton')) {
      event.target.parentNode.remove();
      saveTasksToLocalStorage();
    }
  });

  // Load tasks from local storage on page load
  loadTasksFromLocalStorage();

  function createTaskItem(taskText, categoryValue, dateValue, priorityValue) {
    var taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span class="taskCategory ${categoryValue}">${categoryValue}</span>
      <span class="taskText">${taskText}</span>
      <span class="taskDate">${dateValue}</span>
      <span class="taskPriority ${priorityValue}">${priorityValue}</span>
      <button class="deleteButton">Delete</button>
    `;
    return taskItem;
  }

  function saveTasksToLocalStorage() {
    var tasks = [];
    var taskItems = taskList.getElementsByTagName('li');

    for (var i = 0; i < taskItems.length; i++) {
      var taskText = taskItems[i].querySelector('.taskText').innerText;
      var categoryValue = taskItems[i].querySelector('.taskCategory').innerText;
      var dateValue = taskItems[i].querySelector('.taskDate').innerText;
      var priorityValue = taskItems[i].querySelector('.taskPriority').innerText;

      var task = {
        taskText: taskText,
        categoryValue: categoryValue,
        dateValue: dateValue,
        priorityValue: priorityValue
      };

      tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks) {
      for (var i = 0; i < tasks.length; i++) {
        var taskItem = createTaskItem(tasks[i].taskText, tasks[i].categoryValue, tasks[i].dateValue, tasks[i].priorityValue);
        taskList.appendChild(taskItem);
      }
    }
  }
});

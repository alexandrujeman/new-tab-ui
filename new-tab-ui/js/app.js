const taskList = document.querySelector(".collection");
const inputName = document.getElementById("inputName");
const nameForm = document.querySelector(".name-form");
const taskListContainer = document.querySelector(".task-list-container");
const taskForm = document.querySelector(".task-list-form");
const taskInput = document.querySelector("#inputTask");

// App initialize
function initialize() {
  document.addEventListener("DOMContentLoaded", getData);
  // Add task event
  taskForm.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  //
  taskListContainer.classList.add("show");
}
initialize();

function getData() {
  chrome.storage.sync.get(
    {
      name: "",
      color: "",
      tasks: []
    },
    function(items) {
      let userName = items.name;
      let userColor = items.color;
      let userTasks = items.tasks;
      if (userName === null || userName.length === 0) {
        nameForm.classList.add("show");
        taskListContainer.classList.remove("show");
        askName();
      } else {
        document.getElementById("firstname").innerHTML = `Hello ${userName}`;
      }
      if (userColor === null || userColor.length === 0) {
        userColor = "";
        document.body.style.color = "#FF00FF";
      } else {
        document.body.style.color = userColor;
      }
      if (userTasks === null || userTasks.length === 0) {
        userTasks = [];
      } else {
        userTasks.forEach(function(task) {
          // Create li element
          const li = document.createElement("li");
          // Add class
          li.className = "collection-item";
          // Create text node and append to li
          li.appendChild(document.createTextNode(task));
          // Create new link element
          const link = document.createElement("a");
          // Add class
          link.className = "delete-item secondary-content shadow-text";
          // Add icon html
          link.innerHTML = '<i class="material-icons">close</i>';
          // Append the link to li
          li.appendChild(link);
          // Append li to ul
          taskList.appendChild(li);
        });
      }
    }
  );
}

// Ask and save name to chrome storage
function askName() {
  nameForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let inputValue = inputName.value;
    nameForm.classList.remove("show");
    document.getElementById("firstname").innerHTML = `Hello ${inputValue}`;
    chrome.storage.sync.set({
      name: inputValue
    });
  });
}

// Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content shadow-text";
    // Add icon html
    link.innerHTML = '<i class="material-icons">close</i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // Save tasks in local storage
    saveTasksLS(taskInput.value);
    // Clear input
    taskInput.value = "";
    e.preventDefault();
  }
}

// Save tasks in local storage
function saveTasksLS(task) {
  chrome.storage.sync.get(
    {
      tasks: []
    },
    function(items) {
      let tasks;
      if (items.tasks === null) {
        tasks = [];
      } else {
        tasks = items.tasks;
      }
      tasks.push(task);
      chrome.storage.sync.set({
        tasks: tasks
      });
    }
  );
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    // Remove task from local storage
    removeTaskLS(e.target.parentElement.parentElement);
  }
}

// Remove tasks from local storage
function removeTaskLS(taskItem) {
  chrome.storage.sync.get(
    {
      tasks: []
    },
    function(items) {
      let tasks = items.tasks;
      tasks.forEach(function(task, index) {
        if (taskItem.textContent === `${task}close`) {
          tasks.splice(index, 1);
        }
      });
      chrome.storage.sync.set({
        tasks: tasks
      });
    }
  );
}

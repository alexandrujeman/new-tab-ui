const taskList = document.querySelector(".collection");
const inputName = document.getElementById("inputName");
const nameForm = document.querySelector(".name-form");

// App initialize
function initialize() {
  document.addEventListener("DOMContentLoaded", getData);
}
initialize();

function getData() {
  chrome.storage.sync.get(
    {
      user: {
        "name": "",
        "color": "",
        "tasks": []
      }
    },
    function(items) {
    let userData = items.user;
    console.log(userData);
      if (userData.name === null || userData.name.length === 0) {
        nameForm.classList.add("show");
        askName();
      } else {
        document.getElementById("firstname").innerHTML = `Hello ${userData.name}`;
      } 
      if (userData.color.length === 0) {
        userData.color = "";
        document.body.style.color = "#FFFFFF";
      } else {
        document.body.style.color = userData.color;
      }
      if (userData.tasks.length === 0) {
        userData.tasks = []
      } else {
      console.log(userData.tasks)
      userData.tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement("li");
        // Add class
        li.className = "collection-item";
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement("a");
        // Add class
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
      });
    }
    }
  )
}

// Ask and save name to chrome storage
function askName(){
  nameForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let inputValue = inputName.value;
    nameForm.classList.remove("show");
    chrome.storage.sync.set(
      {
        user: {
          "name": inputValue
        }
    });
  });
}


// Saves options to chrome.storage
function save_options() {
  var color = document.getElementById("colors").value;
  var name = document.getElementById("name").value;
  
  chrome.storage.sync.set(
    {
      user: {
        "name": name,
        "color": color,
      }
    },
    function() {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 750);
    }
  );
}

function reset_options() {
  var color = "#FFFFFF";
  var name = null;
  var tasks = []
  chrome.storage.sync.set(
    {
      user: {
        "name": name,
        "color": color,
        "tasks": tasks
      }
    },
    function() {
      // Update status to let user know options were reset.
      var status = document.getElementById("status");
      status.textContent = "Options Reset.";
      setTimeout(function() {
        status.textContent = "";
        restore_options();
      }, 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
    {
      user: {
        "name": "",
        "color": "#ffffff"
      }
    },
    function(items) {
      document.getElementById("colors").value = items.user.color;
      document.getElementById("name").value = items.user.name;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
document.getElementById("reset").addEventListener("click", reset_options);

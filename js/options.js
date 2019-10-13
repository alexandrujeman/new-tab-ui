// Saves options to chrome.storage
function save_options() {
  var colors = document.getElementById("colors").value;
  var name = document.getElementById("name").value;
  chrome.storage.sync.set(
    {
      clockColor: colors,
      firstName: name
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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
    {
      clockColor: "#FF0000",
      firstName: "",
    },
    function(items) {
      document.getElementById("colors").value = items.clockColor;
      document.getElementById("name").value = items.firstName;
      console.log(items.firstName)
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);

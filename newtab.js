function clock() {
  const fullDate = new Date();

  let hours = fullDate.getHours();
  let minutes = fullDate.getMinutes();
  let seconds = fullDate.getSeconds();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = `:${minutes}`;
  document.getElementById('seconds').innerHTML = `:${seconds}`;
}

setInterval(clock, 100);

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
    {
      clockColor: "#FF0000",
      likesColor: true,
      firstName: "",
    },
    function(items) {
      document.getElementById("hours").style.color = items.clockColor;
      document.getElementById("minutes").style.color = items.clockColor;
      document.getElementById("seconds").style.color = items.clockColor;
      document.getElementById("firstname").innerHTML = `Hello ${items.firstName}`;
  
  
    }
  );
}

restore_options();

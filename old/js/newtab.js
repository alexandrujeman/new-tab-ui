// Restores state using the preferences
// stored in chrome.storage. If empty will ask for name.
function apply_options() {
  // Use default value color = '#FFFFFF'
  chrome.storage.sync.get(
    {
      clockColor: "#FFFFFF",
      firstName: ""
    },
    function(items) {
      document.getElementById("hours").style.color = items.clockColor;
      document.getElementById("minutes").style.color = items.clockColor;
      document.getElementById("firstname").innerHTML = `Hello ${items.firstName}`;
      document.getElementById("firstname").style.color = items.clockColor;
    }
  );
}

apply_options();

// Random ackground image from ./img
const body = document.querySelector("body");
const totalImages = 5;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `./img/${imgNumber + 1}.jpg`;
    image.classList.add("background-image");
    body.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * totalImages);
    return number;
}

function bgInit() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

bgInit();

// Clock function
function clock() {
  const fullDate = new Date();

  let hours = fullDate.getHours();
  let minutes = fullDate.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = `:${minutes}`;
}

setInterval(clock, 100);

// Get Name variables
const form = document.querySelector(".name-form");
const inputName = document.getElementById("inputName");
// Check for Name existing name
function checkName() {}
// Handle Name submit
function handleSubmit(event) {
  event.preventDefault();
  event.stopPropagation();
  const inputValue = inputName.value;
  form.classList.remove("show");
  saveName(inputValue);
}

// Ask for Name
function ask_name() {
  checkName();
  form.classList.add("show");
  form.addEventListener("submit", handleSubmit);
}

// Save Name
function saveName(inputName) {
  chrome.storage.sync.set({
    firstName: inputName
  });
  document.getElementById("firstname").innerHTML = `Hello ${inputName}`;
}

function nameInit() {
  chrome.storage.sync.get(
    {
      firstName: ""
    },
    function(items) {
      let currentUser = items.firstName;
      if (currentUser === null) {
        document.getElementById("firstname").innerHTML = `Hello`;
        ask_name();
      }
    }
  );
}

nameInit();

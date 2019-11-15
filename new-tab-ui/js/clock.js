// Clock feature
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

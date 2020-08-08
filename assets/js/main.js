let cards = document.querySelectorAll(".card");
let restartbtn = document.getElementById("restart-btn");
let startbtn = document.getElementById("start-btn");
let popup = document.getElementById("popup");
let cardrow = document.querySelectorAll(".rows");
// set clicktile to null
let clickedtile = null;
// to set score
let count = 0;
// for timer
let s = 0,
  m = 0,
  h = 0;
let timer;
let stopwatch = document.querySelector(".stopwatch");
//preloader
startbtn.addEventListener("click", function startGame(params) {
  $(".status").fadeOut();
  $("#preloader").delay(500).fadeOut();
  startTimer();
});
// run timer
function startTimer() {
  timer = setInterval(run, 500);
}
function run() {
  stopwatch.textContent =
    (h < 10 ? "0" + h : h) +
    ":" +
    (m < 10 ? "0" + m : m) +
    ":" +
    (s < 10 ? "0" + s : s);
  s++;
  if (s == 60) {
    s = 0;
    m++;
  }
}
function stopTimer() {
  clearInterval(timer);
  timer = false;
}
// for each card in cards
cards.forEach((card) => {
  card.addEventListener(
    "click",

    function onTileClicked(e) {
      // set the current target for the event.
      let clicked = e.currentTarget;
      // if two tiles match or contains a disabled class, stop code
      if (clicked === clickedtile || clicked.className.includes("disabled")) {
        return;
      }
      // remove the grey color when a tile is clicked on
      clicked.classList.remove("hide-color");

      if (!clickedtile) {
        clickedtile = clicked;
      } else if (clickedtile) {
        // check if clicked tiles match and disable pointer events
        // compare data-color attributes, if they match then add a disabled class and then reset clicked to null
        if (
          clickedtile.getAttribute("data-color") ===
          clicked.getAttribute("data-color")
        ) {
          // used innerhtml to change the content of my div
          popup.innerHTML =
            ' <img src="./assets/images/bananadance.gif">  </br> Right answer ';
          popup.style.display = "block";
          popup.style.border = "5px solid #FFBE00 ";
          count++;
          if (count === 6) {
            console.log("game over");
            popup.innerHTML =
              ' <img src="./assets/images/celebrate.gif">  </br> Game Over! </br> you got all tiles correct in ' +
              h +
              ":" +
              m +
              ":" +
              (s - 1) +
              "seconds";
            stopTimer();
            popup.style.display = "block";
            popup.style.border = "5px solid #0133B6 ";
          }
          clicked.classList.add("disabled");
          clickedtile.classList.add("disabled");
          clickedtile = null;
          // else add back the grey color after .5secs and reset the tile to null
        } else if (
          clickedtile.getAttribute("data-color") !==
          clicked.getAttribute("data-color")
        ) {
          popup.innerHTML =
            ' <img src="./assets/images/smh.gif">  </br> Wrong answer ';
          popup.style.display = "block";
          popup.style.border = "5px solid #FFBE00 ";

          setTimeout(() => {
            // popup.style.display = "none";
            clickedtile.classList.add("hide-color");
            clicked.classList.add("hide-color");
            clickedtile = null;
          }, 500);
        }
      }
    }
  );
});
// restart game
restartbtn.addEventListener("click", restart);
function restart() {
  window.location.reload();
}

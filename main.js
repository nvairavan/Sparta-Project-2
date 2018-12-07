var tiles = 16;
var timer = 25;

var numsToAssign = [];
for (let i = 0; i < tiles / 2; i++) {
  numsToAssign.push(i, i);
}

// Assign each number of numsToAssign to each tile randomly
function loadNumber() {
  var randomNum = Math.floor(Math.random() * 10 + 1);
  var randomTile = document.querySelectorAll('.tile p')[randomNum];

  for (let i = 0; i < tiles; i++) {
    do {
      if (!randomTile.innerHTML) {
        randomTile.innerHTML = numsToAssign.shift();
      }
      randomNum = Math.floor(Math.random() * tiles);
      randomTile = document.querySelectorAll('.tile p')[randomNum];
    } while (randomTile.innerHTML && numsToAssign.length > 0)
  }
  countDown();
  startGame();
}

function resetGame() {
  location.reload();
}

function countDown() {
  var t = setInterval(function () {
    if (timer > 0) { timer--; }
    document.getElementById("timer").innerHTML = ("Time Left : " + timer)
    if (timer === 0) {
      document.getElementById('timeout').innerHTML = " You Lost!";
      disableScreen()
      clearInterval(t);
    }
  }, 1000)
}

function startGame() {
  let tiles = document.querySelectorAll('.tile');
  let firstClickedTile;
  let secondClickedTile;

  // Add click event for every tile
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', matching);
  }

  /****************************Check for match******************************
  If the tiles matches:
   - add 'matched' class to the matched tiles;
   - remove the click event for the matched tiles;
   - remove blur for the matched tiles;
  Else keep the blur.
  **************************************************************************/

  function matching(e) {
    if (!firstClickedTile) {
      firstClickedTile = e.target;
      firstClickedTile.style.filter = 'blur(0px)';
    } else if (e.target !== firstClickedTile) {
      secondClickedTile = e.target;
      secondClickedTile.style.filter = 'blur(0px)';

      if (firstClickedTile.innerText == secondClickedTile.innerText) {
        firstClickedTile.classList.add('matched');
        secondClickedTile.classList.add('matched');

        firstClickedTile.removeEventListener('click', matching);
        secondClickedTile.removeEventListener('click', matching);

        firstClickedTile.style.filter = 'blur(0px)';
        secondClickedTile.style.filter = 'blur(0px)';

        tilesClickDelayAndWinCheck();
      } else {
        setTimeout(() => {
          firstClickedTile.style.filter = 'blur(15px)';
          secondClickedTile.style.filter = 'blur(15px)';
        }, 400);

        tilesClickDelayAndWinCheck();
      }

      setTimeout(() => {
        firstClickedTile = undefined;
      }, 400);
    }
  }
}

// Removes click events on tiles to be able to see the second tile, then adds events back.
function tilesClickDelayAndWinCheck() {
  let notMatchedTiles = 0;

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].removeEventListener('click', matching);
    if (!tiles[i].classList.contains('matched')) {
      notMatchedTiles += 1;
    }
  }
  if (notMatchedTiles === 0) {
    return;
  }

  setTimeout(() => {
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener('click', matching);
    }
  }, 400);
}

// creates div with overlay class and adds it to the DOM
function disableScreen() {
  var div = document.createElement("div");
  div.className += "overlay";
  document.body.appendChild(div);

  // Asks user for replaying the game
  if (confirm("You weren't able to finish the game on time, Do you want to play the game again?")) {
    location.reload()
  }
}
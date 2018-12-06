var tiles = 16;
var timer = 25;

var numsToAssign = [];
for (let i = 0; i < tiles / 2; i++) {
  numsToAssign.push(i, i);
}
function startGame() {

  // Assign each number of `numsToAssign` to each tile randomly
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
  countDown()
}

function resetGame() {
  location.reload();
}

function countDown() {
  setInterval(function () {
    if (timer > 0) { timer--; }
    document.getElementById("timer").innerHTML = ("Time Left : " + timer)
    if (timer === 0) {
      document.getElementById('timeout').innerHTML = " You Lost!";
      // *********************************************************
      document.getElementById('gametitle').style.display = 'none';
      // *********************************************************
    }
  }, 1000)
}


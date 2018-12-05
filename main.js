var tiles = 16;

function startGame() {

  var numsToAssign = [];

  for (let i = 0; i < 16 / 2; i++) {
    numsToAssign.push(i, i);
  }

  // Assign each number of `numsToAssign` to each tile randomly
  var randomNum = Math.floor(Math.random() * 10 + 1);
  var randomTile = document.querySelectorAll('.tile p')[randomNum];

  for (let i = 0; i < 16; i++) {
    do {
      if (!randomTile.innerHTML) {
        randomTile.innerHTML = numsToAssign.shift();
      }

      randomNum = Math.floor(Math.random() * 16);
      randomTile = document.querySelectorAll('.tile p')[randomNum];
    } while (randomTile.innerHTML && numsToAssign.length > 0)
  }

}
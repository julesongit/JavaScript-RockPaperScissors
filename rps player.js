const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");
const newscore = document.getElementById("newscore");
let playerone = document.getElementById("playerone");
let playertwo = document.getElementById("playertwo");
let playername1 = document.getElementById("playeronename");
let playername2 = document.getElementById("playertwoname");
let turn = 1;
let items = [];
let start = false;
//  The scoreboard variable contains objects player and computer -my comment
const scoreboard = {
  player: 0,
  player2: 0,
  draw: 0,
  newscore: 0,
};
// To add a player name
function addname() {
  if (playerone.value == "" || playertwo.value == "") {
    alert("Please Enter your Player Names");
  } else {
    start = true;
    alert("Player 1 goes First");
    playername1.innerHTML = `${playerone.value} : ${scoreboard.player}`;
    playername2.innerHTML = `${playertwo.value} : ${scoreboard.player2}`;
  }
}
// To edit a player name
function editPlayer() {
  playername1.innerHTML = `${playerone.value} : ${scoreboard.player}`;
  playername2.innerHTML = `${playertwo.value} : ${scoreboard.player2}`;
}

// Play game
function play(e) {
  // the game will not start unless the players enter their names which enables the boolean start 
  if (start == false) {
    alert("You have to enter names and Press Play to Start Game");
  } else {
    restart.style.display = "inline-block";
    const playerChoice = e.target.id;

    playerSelected(playerChoice);

    if (turn == 3) {
      scoreboard.newscore++;
      const winner = getWinner(items[0], items[1]);
      showWinner(winner);
      showConfetti();
      // new turn/round when the player wins which resets the variable of turn and items
      turn = 1;
      items = [];
    }
  }
}
// Changes between player one and player two
function playerSelected(item) {
  if (turn % 2) {
    alert("Player one has selected. Press Ok for Player two to select");
    turn++;
    items.push(item);
  } else {
    alert("Player two has selected. Press Ok to see result");
    turn++;
    items.push(item);
  }
}

//items = ["rock", "paper"]

// Get game winner
function getWinner(pOne, pTwo) {
  if (pOne === pTwo) {
    return "draw";
  } else if (pOne === "rock") {
    if (pTwo === "paper") {
      return "playertwo";
    } else {
      return "playerone";
    }
  } else if (pOne === "paper") {
    if (pTwo === "scissors") {
      return "playertwo";
    } else {
      return "playerone";
    }
  } else if (pOne === "scissors") {
    if (pTwo === "rock") {
      return "playertwo";
    } else {
      return "playerone";
    }
  }
}

function showWinner(winner) {
  if (winner === "playerone") {
    let playerTwoSelected = items[1];

    // Inc player score
    scoreboard.player++;
    // Show modal result

    if (playerTwoSelected === "rock") {
      result.innerHTML = `
         <h1 class="text-win">Player one wins</h1>
        <i><img src="https://t3.ftcdn.net/jpg/00/55/21/18/360_F_55211893_pMzGwbg4p7yElUGfc868m9dUXaknoWkU.jpg" height="50"></i>
       <p>Player two Chose <strong>${
         playerTwoSelected.charAt(0).toUpperCase() + playerTwoSelected.slice(1)
       }</strong></p>
     `;
    } else if (playerTwoSelected === "paper") {
      result.innerHTML = `
         <h1 class="text-win">Player one wins</h1>
        <i><img src="https://images.vexels.com/media/users/3/256349/isolated/preview/864c07d64db6ec24e19c39acb16f0a89-winking-piece-of-paper-cartoon.png" height="50"></i>
       <p>Player two Chose <strong>${
         playerTwoSelected.charAt(0).toUpperCase() + playerTwoSelected.slice(1)
       }</strong></p>
     `;
    } else {
      result.innerHTML = `
         <h1 class="text-win">Player one wins</h1>
        <i><img src="https://clipart.world/wp-content/uploads/2020/06/cartoon-scissors.jpg" height="50"></i>
       <p>Player two Chose <strong>${
         playerTwoSelected.charAt(0).toUpperCase() + playerTwoSelected.slice(1)
       }</strong></p>
     `;
    }
  } else if (winner === "playertwo") {
    let playerOneSelected = items[0];
    // Inc computer score
    scoreboard.player2++;
    // Show modal result

    if (playerOneSelected === "rock") {
      result.innerHTML = `
      <h1 class="text-win">Player two wins</h1>
      <i><img src="https://t3.ftcdn.net/jpg/00/55/21/18/360_F_55211893_pMzGwbg4p7yElUGfc868m9dUXaknoWkU.jpg" height="50"></i>
      <p>Player one Chose <strong>${
        playerOneSelected.charAt(0).toUpperCase() + playerOneSelected.slice(1)
      }</strong></p>
    `;
    } else if (playerOneSelected === "paper") {
      result.innerHTML = `
      <h1 class="text-win">Player two wins</h1>
      <i><img src="https://images.vexels.com/media/users/3/256349/isolated/preview/864c07d64db6ec24e19c39acb16f0a89-winking-piece-of-paper-cartoon.png" height="50"></i>
      <p>Player one Chose <strong>${
        playerOneSelected.charAt(0).toUpperCase() + playerOneSelected.slice(1)
      }</strong></p>
    `;
    } else {
      result.innerHTML = `
      <h1 class="text-win">Player two wins</h1>
      <i><img src="https://clipart.world/wp-content/uploads/2020/06/cartoon-scissors.jpg" height="50"></i>
      <p>Player one Chose <strong>${
        playerOneSelected.charAt(0).toUpperCase() + playerOneSelected.slice(1)
      }</strong></p>
  `;
    }
  } else {
    scoreboard.draw++;

    result.innerHTML = `
      <h1 class="text-lose">Draw</h1>
      <p>You Draw</p>
  `;
  }
  // Show score
  score.innerHTML = `
    <p>${playerone.value} : ${scoreboard.player}</p>
    <p>${playertwo.value} : ${scoreboard.player2}</p>
    `;
  newscore.innerHTML = `
  <p>Draw: ${scoreboard.draw}</p>
  <p>Games Played ${scoreboard.newscore}</p>
    `;
  modal.style.display = "block";
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.player2 = 0;
  scoreboard.newscore = 0;
  scoreboard.draw = 0;
  score.innerHTML = `
    <p>${playerone.value} : 0</p>
    <p>${playertwo.value}: 0</p>
  `;
  newscore.innerHTML = `
  <p>Draw : 0</p>
  <p>Games Played : 0</p>
  `;
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// Event listeners
choices.forEach((choice) => choice.addEventListener("click", play));
window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);

//This displays the confetti
function showConfetti() {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

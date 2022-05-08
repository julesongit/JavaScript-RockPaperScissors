const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");
const newscore = document.getElementById("newscore");
//  The scoreboard variable contains objects player and computer -my comment
const scoreboard = {
  player: 0,
  computer: 0,
  draw: 0,
  newscore: 0,
};

// Play game
function play(e) {
  restart.style.display = "inline-block";
  const playerChoice = e.target.id;
  scoreboard.newscore++;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computers choice
function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return "rock";
  } else if (rand <= 0.67) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Get game winner
function getWinner(p, c) {
  if (p === c) {
    return "draw";
  } else if (p === "rock") {
    if (c === "paper") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "paper") {
    if (c === "scissors") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "scissors") {
    if (c === "rock") {
      return "computer";
    } else {
      return "player";
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === "player") {
    // Inc player score
    scoreboard.player++;
    // Show modal result

    if (computerChoice === "rock") {
      result.innerHTML = `
         <h1 class="text-win">You Win</h1>
        <i><img src="https://t3.ftcdn.net/jpg/00/55/21/18/360_F_55211893_pMzGwbg4p7yElUGfc868m9dUXaknoWkU.jpg" height="50"></i>
       <p>Computer Chose <strong>${
         computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
       }</strong></p>
     `;
    } else if (computerChoice === "paper") {
      result.innerHTML = `
         <h1 class="text-win">You Win</h1>
        <i><img src="https://images.vexels.com/media/users/3/256349/isolated/preview/864c07d64db6ec24e19c39acb16f0a89-winking-piece-of-paper-cartoon.png" height="50"></i>
       <p>Computer Chose <strong>${
         computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
       }</strong></p>
     `;
    } else {
      result.innerHTML = `
         <h1 class="text-win">You Win</h1>
        <i><img src="https://clipart.world/wp-content/uploads/2020/06/cartoon-scissors.jpg" height="50"></i>
       <p>Computer Chose <strong>${
         computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
       }</strong></p>
     `;
    }

    // result.innerHTML = `
    //   <h1 class="text-win">You Win</h1>
    //   <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    //   <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
    //     computerChoice.slice(1)}</strong></p>
    // `;
  } else if (winner === "computer") {
    // Inc computer score
    scoreboard.computer++;
    // Show modal result

    if (computerChoice === "rock") {
      result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i><img src="https://t3.ftcdn.net/jpg/00/55/21/18/360_F_55211893_pMzGwbg4p7yElUGfc868m9dUXaknoWkU.jpg" height="50"></i>
      <p>Computer Chose <strong>${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      }</strong></p>
    `;

    } else if (computerChoice === "paper") {
      result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i><img src="https://images.vexels.com/media/users/3/256349/isolated/preview/864c07d64db6ec24e19c39acb16f0a89-winking-piece-of-paper-cartoon.png" height="50"></i>
      <p>Computer Chose <strong>${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      }</strong></p>
    `;
    } else {
      result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i><img src="https://clipart.world/wp-content/uploads/2020/06/cartoon-scissors.jpg" height="50"></i>
      <p>Computer Chose <strong>${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
    }</strong></p>
  `;
    }

    // result.innerHTML = `
    //   <h1 class="text-lose">You Lose</h1>
    //   <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    //   <p>Computer Chose <strong>${
    //     computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
    //   }</strong></p>
    // `;
  } else {
    scoreboard.draw++;

    result.innerHTML = `
      <h1 class="text-lose">Draw</h1>
      <p>You Draw</p>
  `;
  }
  // Show score
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
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
  scoreboard.computer = 0;
  scoreboard.newscore = 0;
  scoreboard.draw = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
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

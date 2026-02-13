const MAX_POINTS = 5;
const CHOICES = ["rock", "scissors", "paper"];

// paper beats rock
// scissors beats paper
// rock beats scissors
const winsAgainst = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function normalizeChoice(string) {
  return string.trim().toLowerCase();
}

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
}

function playRound(humanChoice, computerChoice) {
  const human = normalizeChoice(humanChoice);
  const computer = normalizeChoice(computerChoice);

  const valid = winsAgainst[human] && winsAgainst[computer];
  if (!valid) {
    return { human: 0, computer: 0, message: "INVALID" };
  }

  if (human === computer) {
    return { human: 0, computer: 0, message: "DRAW" };
  }

  const humanWins = winsAgainst[human] === computer;

  return humanWins
    ? { human: 1, computer: 0, message: `You win! ${human} beats ${computer}` }
    : {
        human: 0,
        computer: 1,
        message: `You lose! ${computer} beats ${human}`,
      };
}

function createGameUI(root = document) {
  const controls = root.querySelector(".controls");
  const display = root.querySelector(".display");

  if (!controls || !display) {
    throw new Error("Expected .controls and .display elements in the DOM!");
  }

  let results = root.querySelector(".results");
  if (!results) {
    results = root.createElement("div");
    results.classList.add("results");
    controls.insertAdjacentElement("afterend", results);
  }

  const buttons = Array.from(controls.querySelectorAll("button"));

  if (buttons.length === 0) {
    throw new Error("Expected buttons inside .controls");
  }

  return { controls, display, results, buttons };
}

function playGame() {
  const ui = createGameUI();

  const state = {
    humanScore: 0,
    computerScore: 0,
    gameOver: false,
    lastMessage: "",
  };

  function render() {
    ui.display.textContent = `Score: You ${state.humanScore} - Computer ${state.computerScore}`;
    ui.results.textContent = state.lastMessage;

    ui.buttons.forEach((btn) => {
      btn.disabled = state.gameOver;
    });
  }

  function checkGameState() {
    if (state.humanScore >= MAX_POINTS || state.computerScore >= MAX_POINTS) {
      state.gameOver = true;

      if (state.humanScore > state.computerScore) {
        state.lastMessage = "You win!";
      } else if (state.computerScore > state.humanScore) {
        state.lastMessage = "You lose!";
      } else {
        state.lastMessage = "Game ends in a DRAW!";
      }

      render();
    }
  }

  function onClick(event) {
    if (state.gameOver) return;

    const button = event.target.closest("button");
    if (!button || !ui.controls.contains(button)) return;

    const playerSelection = button.id;
    if (!playerSelection) return;

    const computerChoice = getComputerChoice();

    const outcome = playRound(playerSelection, computerChoice);

    state.humanScore += outcome.human;
    state.computerScore += outcome.computer;
    state.lastMessage = outcome.message;

    checkGameState();
    render();
  }

  ui.controls.addEventListener("click", onClick);
  render();
}

playGame();

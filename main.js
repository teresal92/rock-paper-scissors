const choices = ["rock", "scissors", "paper"];

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getHumanChoice() {
  // get user input
  let userInput = window.prompt("Enter your choice: rock, paper or scissors");
  console.log(userInput);

  return userInput;
}

// paper beats rock
// scissors beats paper
// rock beats scissors
const winsAgainst = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function playRound(humanChoice, computerChoice) {
  const normalizedHumanChoice = humanChoice.toLowerCase();
  const normalizedComputerChoice = computerChoice.toLowerCase();

  if (
    !winsAgainst[normalizedHumanChoice] ||
    !winsAgainst[normalizedComputerChoice]
  ) {
    console.log("Invalid choice.");
    return;
  }

  if (winsAgainst[normalizedHumanChoice] === normalizedComputerChoice) {
    console.log(
      `You win! ${normalizedHumanChoice} beats ${normalizedComputerChoice}`,
    );
    humanScore++;
  } else if (winsAgainst[normalizedComputerChoice] === normalizedHumanChoice) {
    console.log(
      `You lose! ${normalizedComputerChoice} beats ${normalizedHumanChoice}`,
    );
    computerScore++;
  } else {
    // if equal this is a draw and no one wins
    console.log("Draw! No one wins.");
  }

  return;
}

const computerChoice = getComputerChoice();
const humanChoice = getHumanChoice();

playRound(humanChoice, computerChoice);

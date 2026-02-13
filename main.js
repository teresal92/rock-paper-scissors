const MAX_ROUNDS = 5;
const CHOICES = ["rock", "scissors", "paper"];

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
}

function getHumanChoice() {
  // get user input
  let userInput = window.prompt("Enter your choice: rock, paper or scissors");
  console.log(userInput);

  return userInput ? userInput.trim() : ""; // safe string
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
  const normalizedHumanChoice = humanChoice.trim().toLowerCase();
  const normalizedComputerChoice = computerChoice.trim().toLowerCase();

  if (
    !winsAgainst[normalizedHumanChoice] ||
    !winsAgainst[normalizedComputerChoice]
  ) {
    console.log("Invalid choice.");
    return { human: 0, computer: 0 };
  }

  if (winsAgainst[normalizedHumanChoice] === normalizedComputerChoice) {
    console.log(
      `You win! ${normalizedHumanChoice} beats ${normalizedComputerChoice}`,
    );
    return { human: 1, computer: 0 };
  } else if (winsAgainst[normalizedComputerChoice] === normalizedHumanChoice) {
    console.log(
      `You lose! ${normalizedComputerChoice} beats ${normalizedHumanChoice}`,
    );
    return { human: 0, computer: 1 };
  } else {
    // if equal this is a draw and no one wins
    console.log("DRAW!");
    return { human: 0, computer: 0 };
  }
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  let roundsPlayed = 0;

  while (roundsPlayed < MAX_ROUNDS) {
    const computerChoice = getComputerChoice();
    const humanChoice = getHumanChoice();

    const { human, computer } = playRound(humanChoice, computerChoice);

    humanScore += human;
    computerScore += computer;

    roundsPlayed++;
    console.log(`Score: You ${humanScore} - Computer ${computerScore}`);
  }

  if (humanScore > computerScore) {
    console.log("You win!");
  } else if (computerScore > humanScore) {
    console.log("You lose!");
  } else {
    console.log("DRAW!");
  }
}

// playGame();

function sumOfTripledEvens(array = []) {
  // let sum = 0;
  // for (let i = 0; i < array.length; i++) {
  //   // Step 1: If the element is an even number
  //   if (array[i] % 2 === 0) {
  //     // Step 2: Multiply this number by three
  //     const tripleEvenNumber = array[i] * 3;

  //     // Step 3: Add the new number to the total
  //     sum += tripleEvenNumber;
  //   }
  // }
  // return sum;

  return array
    .filter((num) => num % 2 === 0)
    .map((num) => num * 3)
    .reduce((acc, n) => acc + n, 0);
}

console.log(sumOfTripledEvens([1, 2, 3, 4]));

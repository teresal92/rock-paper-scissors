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

getHumanChoice();

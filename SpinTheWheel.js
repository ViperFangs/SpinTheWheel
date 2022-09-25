/* 
Author: Aarya Mathreja
Date: 09/24/2022
Description: Assignment 1 CPI 310 - Spin The Wheel Game on JavaScript
*/

// Initialize prompt-sync to collect user-prompts
const PROMPT = require('prompt-sync')({ sigint: true });

// Initialize FileSync
const FS = require('fs');

// Declare a global player list
let playerList = [];

function main() {
	let numberOfPlayers = 0;
	const GAMEROUNDS = 3;

	console.log('Welcome to CPI 310 Fortunate Wheel');
	numberOfPlayers = PROMPT("Enter number of players: ");

	for (let i = 0; i < numberOfPlayers; i++)
	{
		playerList.push(createPlayer())
	}

	for (i = 1; i <= GAMEROUNDS; i++) {
		index = 0;
		let continueGame = true;

		while(continueGame) {
				let playerWon = playTurn(index);

				if (playerWon) {
					clearRoundScores();
					continueGame = false;
				}

				index += 1;
				if (index >= numberOfPlayers) {
					index = 0;
				}
			}
		}
}

function clearRoundScores() {
	for (let index in playerList) {
		playerList[index].roundScore = 0;
	}
}

// playTurn takes a playerName and  playerNumber as inputs and is responsible for playing a single player turn
// playTurn returns the value of points the player got at the end of the round.
function playTurn(playerIndex) {
	// generates a random word and converts that word into an array
	let puzzleArray = selectRandomWord().split('');
	let puzzleWord = puzzleArray.join('').toLowerCase();
	// generates a new array of size puzzleArray.length and fills it with '-'
	let playerArray = Array(puzzleArray.length).fill('-');
	let gameState = 1;

	console.log(`\nPlayer ${playerIndex + 1} - ${playerList[playerIndex].name} it's your turn!`)
	console.log(`Your round score is ${playerList[playerIndex].roundScore}`)

	while (gameState == 1){
		PROMPT("Press ENTER to spin the Wheel! ")
		// Generates the Points for the current round
		let spinValue = SpinTheWheel();

		console.log(`\nYou Spun: [${spinValue}]`)
		console.log(`Puzzle: ${playerArray.join('')} \t Answer: ${puzzleArray}\n`)

		let playerGuess = PROMPT("What letter would you like to guess? ");
		let correctGuesses = 0;

		for(let index in puzzleArray){
			if (puzzleArray[index].toLowerCase() == playerGuess.toLowerCase()) {
				playerArray[index] =  puzzleArray[index];
				puzzleArray[index] = '-';
				correctGuesses += 1;
			}
		}

		if (correctGuesses >= 1) {
			for (let i = 0; i < correctGuesses; i++){
				playerList[playerIndex].roundScore += spinValue;
			}

			console.log("\nYES!");
			console.log(`Puzzle: ${playerArray.join('')}`);
			console.log(`Your round score is ${playerList[playerIndex].roundScore}`);
		}
		else {
			playerList[playerIndex].roundScore -= spinValue/2;
			console.log("\nNO! Sorry");
			console.log(`Puzzle: ${playerArray.join('')}`);
			console.log(`Your round score is ${playerList[playerIndex].roundScore}`);
			return false;
		}

		gameState = Number(PROMPT('Enter 1 to Spin and Guess again or 2 to solve: '));
		
		if (gameState == 2){
			console.log("\nEnter your word: ");
			let playerFinalWord = PROMPT().toLowerCase();
		
			if(playerFinalWord == puzzleWord){
				console.log(`\nCORRECT! The puzzle word is: ${puzzleWord}`);
				playerList[playerIndex].totalScore +=  playerList[playerIndex].roundScore;
				return true;
			}
			else {
				console.log(`\nINCORRECT! The puzzle word is: ${puzzleWord}`)
				playerList[playerIndex].roundScore = 0;
				return false;
			}
		}
	}
}

function createPlayer() {
	let name;
	
	console.log("\n");
	name = PROMPT("Enter your name: ");
	return {
		name: name,
		roundScore: 0,
		totalScore: 0,
	}
}

// getFileLines takes a filename as an input, and returns the content of that file in an array
function getFileLines(filename) {
	content = FS.readFileSync(filename).toString('UTF-8');
	lines = content.split('\n');
	return lines;
}

// SpinTheWheel returns a random Points value
function SpinTheWheel() {
	// Initialize Array of Scores
	const SCORES = [
		0,
		650,
		900,
		700,
		500,
		800,
		500,
		650,
		500,
		900,
		0,
		1000,
		500,
		900,
		700,
		600,
		8000,
		500,
		700,
		600,
		550,
		500,
		900
	];

	// Find a random number between 0 to length of the SCORES array
	let index = generateRandomNumber(SCORES.length);

	// return the value at the random index
	return SCORES[index];
}

// generateRandomNumber takes an input maxValue and returns a value between 0 and maxValue
function generateRandomNumber(maxValue = 1) {
	return Math.floor(Math.random() * maxValue);
}

// selectRandomWord is responsible for selecting a RandomWord from the dictionary
function selectRandomWord() {
	const dictionary = getFileLines('dictionary.txt');
	randomWordIndex = generateRandomNumber(dictionary.length);

	return dictionary[randomWordIndex];
}

main();

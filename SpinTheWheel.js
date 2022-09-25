/* 
Author: Aarya Mathreja
Date: 09/24/2022
Description: Assignment 1 CPI 310 - Spin The Wheel Game on JavaScript
*/

// Initialize prompt-sync to collect user-prompts
const PROMPT = require('prompt-sync')({ sigint: true });

// Initialize FileSync
const FS = require('fs');

function main() {
	let playerList = []
	let gameOver = false;
	let numberOfPlayers;

	console.log('Welcome to CPI 310 Fortunate Wheel');
	numberOfPlayers = PROMPT("Enter number of players: ");

	for (let i = 0; i < numberOfPlayers; i++)
	{
		playerList.push(createPlayer())
	}

	for (let index in playerList) {
		playTurn(playerList[index], index + 1)
	}
}

// playTurn takes a player and its number as inputs and is responsible for playing a single player turn 
function playTurn(player, number) {
	let spinValue = SpinTheWheel();

	console.log(`\nPlayer ${number} - ${player.name} it's your turn!`)
	console.log(`Your round score is ${player.roundScore}`)
	PROMPT("Press ENTER to spin the Wheel! ")

	console.log(`\nYou Spun: [${spinValue}]`)
}

function createPlayer() {
	let name = PROMPT("Enter your name: ");
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

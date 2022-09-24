/* 
Author: Aarya Mathreja
Date: 09/24/2022
Description: Assignment 1 CPI 310 - Spin The Wheel Game on JavaScript
*/

// Initialize prompt-sync to collect user-prompts
const PROMPT = require('prompt-sync')();
const FS = require('fs');

function main() {
	console.log('Welcome to CPI 310 Fortunate Wheel');
	const dictionary = getFileLines('dictionary.txt');
	console.log(dictionary);
}

function getFileLines(filename) {
	content = FS.readFileSync(filename).toString('UTF-8');
	lines = content.split('\n');
	return lines;
}

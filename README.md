# SpinTheWheel

Assignment 1 - Spin the wheel on JavaScript

Use "node index.js" to run the game. This game can be played with 1-3 players.

The goal of this is to play a simplified game of Wheel of Fortune by drawing
words from a Scrabble dictionary. We won’t be worrying about phrases or any
“advanced” categories of Wheel of Fortune. Therefore, the game will be much more
like Hangman since it focuses on single words.

The user will have the option to play single player or with up to 3 players.  
Each player will “Spin the wheel” to get a reward for successfully guessing a
letter.

They will then guess a letter. If the letter is in the puzzle, all are revealed
to the user and the reward is added to their point total for each letter
revealed.

They will then be given the option to Spine & Guess again or Solve.
If they choose to solve, you’ll do a string comparison between what’s typed in
and the puzzle.

If they succeed... they win! They get their total for the round add to their
running total. Other players don’t get anything.
Highest running total after 3 rounds wins.

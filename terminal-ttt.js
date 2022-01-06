// Tic Tac Toe
// Write a program that lets two humans play a game of Tic Tac Toe in a terminal. 
// The program should let the players take turns to input their moves. 
// The program should report the outcome of the game.
// During your interview, you will pair on adding support for a computer player to your game. 
// You can start with random moves and make the AI smarter if you have time.

// add support for a computer player
// ask user how many human players are playing the game
// if answer == 2, proceed with existing code
// if answer == 1, use function to handle computer's move (call it at appropriate time)
    // computer will find all available spaces on board and pick one at random
// if answer is not 1 and not 2, answer is invalid; ask question again

// game set up
let emptyCell = ' '
let board = []
for (let i = 0; i < 9; i++) {
    board.push(emptyCell) // init board with blank spaces
}
const winCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [0, 4, 8], [2, 5, 8], [2, 4, 6] ] // all the possible win combinations
let player1Turn 
let computerIsPlaying = false

// section divider
const horizontalLine = '\n----------------------------------------------------------------------\n'

// handle user input with built-in readline module
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const startGame = () => {
    player1Turn = true    
    console.log(horizontalLine + '\nWelcome to Tic-Tac-Toe!\n')
    printGameInstructions()
    getNumPlayers()
    // promptUser()
}

const getNumPlayers = () => {
    const message = 'How many human players are playing the game today? '

    rl.question(message, (numPlayers) => {
        if (numPlayers == 2) {
            promptUser()
        } else if (numPlayers == 1) {
            // run function that handles computer's move and call it at appropriate time
            // human is player 1, computer is player 2
            computerIsPlaying = true
            promptUser()
        } else { // input is invalid
            console.log('Sorry, the input is invalid. Please enter a valid number (1 or 2).')
            getNumPlayers()
        }

    })
}

const promptComputer = () => {
    // find all available spaces on board 
    let availableSpaces = []
    for (let i = 0; i < 9; i++) {
        if (board[i] === emptyCell) {
            availableSpaces.push(i)
        }
    }
    
    // pick an available space at random
    const randomNumber = Math.floor(Math.random() * availableSpaces.length)
    const computersMove = availableSpaces[randomNumber]

    console.log('Available spaces: ' + availableSpaces)
    console.log('Computer\'s move: ' + computersMove)

    updateGame(computersMove)
}

const promptUser = () => {
    // indicate whose turn it is
    const currentPlayer = player1Turn ? 'Player 1' : 'Player 2'
    const message = currentPlayer + ', it\'s your turn! Enter a number 1-9: '

    // if computer is playing and it's the computer's turn, get computer move
    if (computerIsPlaying && !player1Turn) {
        return promptComputer()
    }

    // prompt current player for input (their move)
    rl.question(message, (move) => {
        move = move - 1
        updateGame(move)
    })
}   

const updateGame = (playerMove) => {

    // playerMove = Number(playerMove) - 1

    // if input is not valid, prompt user again
    if (!isValidMove(playerMove)) { 
        console.log('\nSorry, that\'s an invalid move! Let\'s try again...\n')
        return promptUser()
    } 

    // complete turn 
    const currentPlayer = player1Turn ? 'Player 1' : 'Player 2'
    console.log('Nice move, ' + currentPlayer + '! The updated board is shown below.')
    placeMark(playerMove)
    printBoard()
    checkForGameover()
}

const isValidMove = (cell) => {
    return board[cell] === emptyCell && (cell >= 0 && cell <= 8)
}

const placeMark = (cell) => {
    const currentMark = player1Turn ? 'x' : 'o'
    board[cell] = currentMark
}

const checkForGameover = () => {
    const playerWon = checkForWin()
    const isTie = !board.includes(emptyCell)

    if (playerWon) {
        // game has a winner
        rl.close()
        console.log(horizontalLine + '\nGame Over!')
        const winner = player1Turn ? 'Player 1' : 'Player 2'
        return console.log('Congratulations, ' + winner + '! You are the winner!\n' + horizontalLine)
    } else if (isTie) { 
        // game is tied
        rl.close()
        console.log(horizontalLine + '\nGame Over!')
        return console.log('It\'s a tie! Better luck next time :/\n' + horizontalLine)
    } else {
        // game is not over, so change current user and move on to next turn
        player1Turn = !player1Turn
        promptUser()
    }
}

const checkForWin = () => {
    let count
    const currentMark = player1Turn ? 'x' : 'o'

    for (let i = 0; i < winCombinations.length; i++) { // loop through win combinations
        count = 0
        for (let j = 0; j < 3; j++) {   // loop through indices in win combination
            if (board[winCombinations[i][j]] === currentMark) { // board cell number matches win combination element
                count += 1
            }
            if (count === 3) {
                return true
            }
        }
    }
    return false
}

const printBoard = () => {
    console.log('\n')
    console.log(' ' + board[0] + ' | ' + board[1] + ' | ' + board[2])
    console.log('---|---|---')
    console.log(' ' + board[3] + ' | ' + board[4] + ' | ' + board[5])
    console.log('---|---|---')
    console.log(' ' + board[6] + ' | ' + board[7] + ' | ' + board[8])
    console.log('\n')
}

const printGameInstructions = () => {
    console.log('Let\'s go over some quick ground rules:\n')
    console.log('- The game board is divided into cells, numbered 1 through 9, as shown below.')
    console.log('- The game requires two players. Player 1 is x. Player 2 is o.')
    console.log('- The first player to place three marks in a row wins the game! Good luck :)\n')
    console.log(' 1 | 2 | 3 ')
    console.log('---|---|---')
    console.log(' 4 | 5 | 6 ')
    console.log('---|---|---')
    console.log(' 7 | 8 | 9 ')
    console.log('\n...Now, let\'s get started!')
    console.log(horizontalLine)
}

startGame()

// Get DOM elements
const scoreValue = document.getElementById('score-value');
const wicketsValue = document.getElementById('wickets-value');
const guessButton = document.getElementById('guess-button');
const guessSelect = document.getElementById('guess-select');
const resultDiv = document.getElementById('result');
const resetButton = document.getElementById('reset-button');
const timerValue = document.getElementById('timer-value');
const leaderboardDiv = document.getElementById('leaderboard');


// Initialize game variables
let score = 0;
let wickets = 0;
let timeLeft = 15;
let timerId;
let highScores = [];
let achievements = []; // Array to store earned achievements
let highestScore = 0;
let totalScore = 0;
let totalWickets = 0;
let totalGames = 0;


// Event listener for  buttons click
guessButton.addEventListener('click', makeGuess);
resetButton.addEventListener('click', resetGame);

// Function to handle guess logic
function makeGuess() {

    if (timeLeft <= 0) {
        resultDiv.textContent = 'Time is up!';
        return;
    }


    const aiOptions = [0, 1, 2, 3, 4, 6];
    const aiRandomIndex = Math.floor(Math.random() * aiOptions.length);
    const aiOption = aiOptions[aiRandomIndex];

    const playerGuess = parseInt(prompt('Enter your guess (0, 1, 2, 3, 4, 6):'));

    if (isNaN(playerGuess) || !aiOptions.includes(playerGuess)) {
        resultDiv.textContent = 'Invalid guess. Please enter a valid number.';
        return;
    }

    if (playerGuess === aiOption) {
        wickets++;
        wicketsValue.textContent = wickets.toString();
        resultDiv.textContent = 'OUT! Wicket fallen.';
        playhowzatSound();
        showWicketAnimation();
    }
    
    else {
        score += playerGuess;
        scoreValue.textContent = score.toString();
        resultDiv.textContent = `Scored ${playerGuess} run(s).`;
        playCheerSound();
        showScoreAnimation(playerGuess);
        updateHighestScore();
        checkAchievements();
    }

    // Reset timer
    clearInterval(timerId);
    startTimer();
}

// Function to reset the game
function resetGame() {
    score = 0;
    wickets = 0;
    timeLeft = 15;
    scoreValue.textContent = '0';
    wicketsValue.textContent = '0';
    resultDiv.textContent = 'The Game is Reset!';
    clearInterval(timerId);
    timerValue.textContent = '15';
}

// Function to start the timer
function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        timerValue.textContent = timeLeft.toString();

        if (timeLeft <= 0) {
            clearInterval(timerId);
            resultDiv.textContent = 'Time is up!';
            updateLeaderboard();
        }
    }, 1000);
}



// Function to update the leaderboard
function updateLeaderboard() {
    const playerName = prompt('Enter your name:');
    const playerScore = score;

    if (playerName && playerScore) {
        const newScore = { name: playerName, score: playerScore };
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);

        if (highScores.length > 20) {
            highScores.splice(20); // Keep only the top 20 scores
        }

        localStorage.setItem('highScores', JSON.stringify(highScores));
        displayLeaderboard();
    }
}

// Function to display the leaderboard as a table

function displayLeaderboard() {
    leaderboardDiv.innerHTML = '';

    const storedScores = localStorage.getItem('highScores');
    if (storedScores) {
        highScores = JSON.parse(storedScores);
    }

    // Create the leaderboard table
    const table = document.createElement('table');
    table.classList.add('leaderboard-table');

    // Create table header

    const headerRow = document.createElement('tr');
    const headerRankCell = document.createElement('th');
    headerRankCell.textContent = 'Rank';
    const headerNameCell = document.createElement('th');
    headerNameCell.textContent = 'Player Name';
    const headerScoreCell = document.createElement('th');
    headerScoreCell.textContent = 'Score';
    headerRow.appendChild(headerRankCell);
    headerRow.appendChild(headerNameCell);
    headerRow.appendChild(headerScoreCell);
    table.appendChild(headerRow);

     // Create table rows for each score
     for (let i = 0; i < highScores.length; i++) {
        const score = highScores[i];
        const row = document.createElement('tr');
        const rankCell = document.createElement('td');
        rankCell.textContent = (i + 1).toString();
        const nameCell = document.createElement('td');
        nameCell.textContent = score.name;
        const scoreCell = document.createElement('td');
        scoreCell.textContent = score.score;
        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        table.appendChild(row);
    }

    leaderboardDiv.appendChild(table);
}


// Start the initial timer
startTimer();
displayLeaderboard();



// function for email chceking

function checkEmail() {
    var email = document.getElementById('email').value;
    var result = document.getElementById('result');
  
    // Regular expression pattern to check email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailPattern.test(email)) {
      result.textContent = 'Email is valid.';
    } else {
      result.textContent = 'Email is not valid.';
    }
}
  
// function for live date time

function updateDateTime() {
    var datetimeElement = document.getElementById('datetime');
    var datetime = new Date();
    var date = datetime.toDateString();
    var time = datetime.toLocaleTimeString();
    datetimeElement.textContent = date + ' ' + time;
  }
  
  // Update the date and time every second
  setInterval(updateDateTime, 1000);
  


// Play cheer sound effect

function playCheerSound() {
    var cheerSound = document.getElementById("cheer-sound");
    cheerSound.play();
  }
  
  // Play howzat sound effect

  function playhowzatSound() {
    var howzatSound = document.getElementById("howzat-sound");
    howzatSound.play();
  }
  
  // Function to trigger the score animation

function showScoreAnimation(playerGuess) {
    var scoreElement = document.createElement('div');
    scoreElement.textContent =(playerGuess);
    scoreElement.classList.add('score-animation');
    document.body.appendChild(scoreElement);
  
    setTimeout(function() {
      scoreElement.remove();
    }, 1000);
  }
  
  // Function to trigger the wicket animation

  function showWicketAnimation() {
    var wicketElement = document.createElement('div');
    wicketElement.textContent =('Wicket! AAAH');
    wicketElement.classList.add('wicket-animation');
    document.body.appendChild(wicketElement);
  
    setTimeout(function() {
      wicketElement.remove();
    }, 1000);
  }
  
 // Function to check and award achievements

 function checkAchievements() {
    // Example achievement: "High Scorer"

    if (score >= highestScore) {
      // Check if the player hasn't already earned the achievement
      if (!achievements.includes("High Scorer")) {
        achievements.push("High Scorer");
        displayAchievement("High Scorer");
      }
    }
   // Add more achievement checks and awards based on your game's criteria
}

  

// Function to display earned achievements

function displayAchievement(achievement) {
    const achievementsList = document.getElementById('achievements-list');
    const achievementItem = document.createElement('li');
    achievementItem.textContent = achievement;
    achievementsList.appendChild(achievementItem);
}

// Function to update the highest score

function updateHighestScore() {
    if (score > highestScore) {
      highestScore = score;
    }
}

// Function to calculate and display game statistics



function calculateStatistics() {
  const averageScore = totalScore / totalGames;
  const wicketsPerGame = totalWickets / totalGames;


  // Get the elements to display the statistics
  const averageScoreElement = document.getElementById('average-score');
  const wicketsPerGameElement = document.getElementById('wickets-per-game');

  // Update the elements with the calculated statistics
  averageScoreElement.textContent = `Average Score: ${averageScore}`;
  wicketsPerGameElement.textContent = `Wickets per Game: ${wicketsPerGame}`;
}

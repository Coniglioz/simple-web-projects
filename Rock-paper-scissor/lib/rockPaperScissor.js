var express = require('express'),
        router = express.Router();

// Rock-paper-scissor game play
router.post('/play', function(req, res) {
    var playerChoice = req.body.value ? req.body.value.toUpperCase() : null,
            shapes = ['ROCK', 'PAPER', 'SCISSORS'],
            computerChoice, result;

    // Validate user choice
    if (!playerChoice || shapes.indexOf(playerChoice) === -1) {
        res.status(500);
        res.json({
            message: "Your choice is not valid!"
        });
        return;
    }

    // Generate computer choice
    computerChoice = shapes[Math.floor(Math.random() * 3)];

    // Compute match result
    if (playerChoice === computerChoice) {
        result = 'tie';
    } else {
        switch (playerChoice) {
            case 'ROCK':
                result = computerChoice === "SCISSORS" ? 'win' : 'loose';
                break;
            case 'PAPER':
                result = computerChoice === "ROCK" ? 'win' : 'loose';
                break;
            case 'SCISSORS':
                result = computerChoice === "PAPER" ? 'win' : 'loose';
                break;
        }
    }

    // Build response
    res.json({
        result: result,
        playerChoice: playerChoice,
        computerChoice: computerChoice,
        gameTimestamp: new Date()
    });
});

module.exports = router;
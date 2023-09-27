const express = require("express");
const { register, login, userDetails, scoring, users } = require("../controllers/userController");


const router = express.Router();

//Register Route
router.post('/register', register)
//Login Route
router.post('/login', login)
//Get Scores for LeaderBoard
router.get('/leaderboard', users)
//Update Score
router.put('/update/:userID/scores/:language', scoring)
// Get User Details
router.get('/users/:userID',userDetails)



module.exports = router;
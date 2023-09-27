//For User Model
const UserModel = require("../models/UserSchema");
//For Authentication
const jwt = require("jsonwebtoken");
//For Password Hashing
const bcrypt = require('bcrypt');


//Creating a Register Controller
const register = async(req,res)=>{
    const {email, name, password} = req.body;
    const userExists = await UserModel.findOne({ email });

    //Checking if the Username already exists
    if(userExists){
        return res.json({Error:"User Already Exists"});
    }

    //Hashing the Password
    const hashedPassword = await bcrypt.hash(password,10);

    //Creating a new User
    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.json('Registered')
    }

}

//Creating Login Controller
const login = async(req,res)=>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});

    //Checking if User Doesnot Exist
    if(!user){
       return res.json("User Doesn't Exist");
    }

    //Comparing the Passwords
    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.json({Error:"Username or Password Doesn't Match"});
    }

    res.json({
        email: user.email,
        id: user._id,
        token : generateToken(user._id),
        message: "Auth",
    });
}

const userDetails = async (req, res) => {
    const userID = req.params.userID;
    
  
    try {
      const user = await UserModel.findById(userID);
  
      if (!user) {
        // Set a 404 status code to indicate that the user doesn't exist
        res.status(404).json({ error: 'User does not exist' });
      } else {
        // Send the user details as JSON response
        res.json({
          name: user.name,
          score: user.score,
          solvedQuestions: user.solvedQuestions
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const scoring = async (req, res) => {
    const userID = req.params.userID;
    const language = req.params.language;
    const updatedScore = req.body.scoreIncrement; // Assuming you send the score increment as 'scoreIncrement'
    const solved = req.body.solved;


    try {
      const user = await UserModel.findById(userID);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Increment the specific score value for the specified language
      user.score[language] += updatedScore;
      user.solvedQuestions.push(...solved);
      
      // Save the updated user object
      await user.save();
  
      res.status(200).json({ message: 'Score updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const users = async(req,res)=>{
    try {
      // Find all users and project only the name and score fields
      const users = await UserModel.find({}, 'name score');
  
      res.json(users); // Send the users' names and scores as JSON response
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


const generateToken = (id) =>{
    return jwt.sign({id}, 'secret', {expiresIn: '30d'})
}

module.exports = {register, login,userDetails,scoring,users}
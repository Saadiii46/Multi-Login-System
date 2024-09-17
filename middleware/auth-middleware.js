const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next) => {

  const token = req.header("Authorization");

  // If token is not provided then show error
  if(!token) {

    return res.status(404).json({message: 'Token not provided'});
  }

  // Replace Bearer with token
  const jwtToken = token.replace("Bearer ", "").trim();

  // Display token on console
  console.log('Token', jwtToken);

  try {
    
    // Verify token
    const verifyToken = jwt.verify(jwtToken, process.env.SECRET_KEY);

    next();

  } catch (error) {
    
    console.error('Token error', error.message);
    return res.status(404).json({message: 'Server error'});

  }

}

module.exports = authMiddleware;
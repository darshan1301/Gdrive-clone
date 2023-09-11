const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(" ")[1];
  }
  
  //console.log("Token", token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).send( 'No token provided' );
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.redirect('/login');
    }

    req.user = {
      userId: decodedToken.userId,
      email: decodedToken.email
    };
    next();
  });
};

module.exports = authentication;
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = function(req,res,next){
  const token = req.header('x-auth-token') || req.body.token || req.query.token;
  if(!token) return res.status(401).json({msg:'No token'});
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; next();
  }catch(err){ res.status(401).json({msg:'Token invalid'}) }
}
